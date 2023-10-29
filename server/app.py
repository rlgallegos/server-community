import os
import openai
import requests
import json
from flask import request, make_response
from flask_restful import Api, Resource
from sqlalchemy import and_
from dotenv import load_dotenv

from models import User, Restaurant, Tip, TipStatistic
from config import app, db, redis_client
from database import update_database_with_oauth
from helpers import save_to_imgur, convert_messages_format, convert_data, convert_restaurant_statistics, convert_tips_to_averages, get_shift_counts
from chat import should_user_drop_shifts, should_user_get_shifts, where_is_user_below_or_above_average

api = Api(app)

load_dotenv()


# User

class UsersByRestaurant(Resource):
    def get(self, rest_id):
        users = User.query.filter(User.restaurant_id == rest_id).all()
        if not users:
            return make_response({'error': 'No Users Found'}, 404)
        user_dicts = [user.to_dict() for user in users]
        return make_response(user_dicts, 200)

api.add_resource(UsersByRestaurant, '/users/<int:rest_id>')

class UsersByRole(Resource):
    def get(self, rest_id, role):
        users = User.query.filter(
            User.restaurant_id == rest_id,
            User.role == role.title()
        ).all()
        if not users:
            return make_response({'error': 'No Users Found'})
        else:
            user_dicts = [user.to_dict() for user in users]
            return make_response(user_dicts, 200)
        
api.add_resource(UsersByRole, '/users/<int:rest_id>/<string:role>')

class UserByID(Resource):
    def patch(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({'error': "User Not Found"}, 401)
        
        # For updating image
        if ('file' in request.files):
            image = request.files.get('file').read()

            # Save to Imgur and Return Link
            save_path, del_hash = save_to_imgur(user.id, image, user.imgur_delete_hash)

            try:
                user.image = save_path
                user.imgur_delete_hash = del_hash
                db.session.add(user)
                db.session.commit()
            except:
                return make_response({'error': 'Failed to Update Image'}, 422)
            return make_response(user.to_dict(), 200)


        # For updating the user's attributes
        data = request.get_json()
        for attr in data:
            setattr(user, attr, data[attr])
        try:
            db.session.add(user)
            db.session.commit()
            return make_response(user.to_dict(rules=('-restaurant.users',)), 200)
        except:
            return make_response({'error': "Unable To Update User"}, 422)

api.add_resource(UserByID, '/user/<int:id>')

# Specifically for fetching with information returned from Google OAuth
class UserByEmail(Resource):
    def get(self, email):
        user = User.query.filter(User.email == email).first()
        if not user:
            return make_response({'error': "User Not Found"}, 404)
        return make_response(user.to_dict(), 200)

api.add_resource(UserByEmail, '/user/<string:email>')


# Restaurant

class Restaurants(Resource):
    def get(self):
        rest_objs = Restaurant.query.all()
        try:
            restaurants = [rest.to_dict() for rest in rest_objs]
            return make_response(restaurants, 200)
        except Exception as e:
            return make_response({'error': ""}, 401)

api.add_resource(Restaurants, '/restaurants')


# Messages

class MessagesByRole(Resource):
    def get(self, rest_id, role):
        redis_key = f"{rest_id}:{role}"
        try:
            string_messages = redis_client.lrange(redis_key, 0, 49)
            messages = convert_messages_format(string_messages)
            return make_response(messages, 200)
        except:
            make_response({"error": "Failed to Load Messages"})

    def post(self, rest_id, role):
        data = request.get_json()
        json_data = json.dumps(data)
        redis_key = f"{rest_id}:{role}"
        try:
            redis_client.rpush(redis_key, json_data)
            response_data = convert_data(data)
            return make_response(response_data, 200)
        except Exception as e:
            print(e)
            return make_response({"error": "Failed to Save Message"}, 422)


api.add_resource(MessagesByRole, '/messages/<int:rest_id>/<string:role>')

class MessagesByID(Resource):
    def get(self, rest_id):
        redis_key = f"{rest_id}"
        try:
            string_messages = redis_client.lrange(redis_key, 0, 49)
            messages = convert_messages_format(string_messages)
            return make_response(messages, 200)
        except:
            make_response({"error": "Failed to Load Messages"})

    def post(self, rest_id):
        data = request.get_json()
        json_data = json.dumps(data)
        redis_key = f"{rest_id}"
        try:
            redis_client.rpush(redis_key, json_data)
            response_data = convert_data(data)
            return make_response(response_data, 200)
        except Exception as e:
            print(e)
            return make_response({"error": "Failed to Save Message"}, 422)

api.add_resource(MessagesByID, '/messages/<int:rest_id>')


# Tips

class TipsByEmail(Resource):
    def get(self, email):
        tips = (
            User.query
            .join(Tip, User.id == Tip.user_id)
            .filter(User.email == email)
            .with_entities(Tip)
            .all()
        )
        if not tips:
            return make_response({"error": "No Tips Found"}, 404)
        else:
            tip_dicts = [tip.to_dict() for tip in tips]
            return make_response(tip_dicts, 200)

api.add_resource(TipsByEmail, '/tips/<string:email>')

class TipStatisticsByEmail(Resource):
    def get(self, email):
        statistics = (
            User.query
            .filter(User.email == email)
            .join(Restaurant, Restaurant.id == User.restaurant_id)
            .join(TipStatistic, Restaurant.id == TipStatistic.restaurant_id)
            .filter(User.role == TipStatistic.role)
            .with_entities(TipStatistic)
            .all()
        )
        if not statistics:
            return make_response({"error": "No Statistics Found"}, 404)
        else:
            statistic_dicts = [stat.to_dict() for stat in statistics]
            return make_response(statistic_dicts, 200)

api.add_resource(TipStatisticsByEmail, '/tipstatistics/<string:email>')


# Chat GPT
@app.route('/suggestion/<string:email>')
def get_suggestion(email):
    if request.method == 'GET':
        user_obj = User.query.filter(User.email == email).first()
        user = user_obj.to_dict(rules=('-restaurant.users', '-image', '-imgur_delete_hash'))
        
        # print(user)

        openai.api_key = os.environ.get("OPENAI_API_KEY")
        messages = [
            {
                "role": "system",
                "content": "You are a financial expert who is friendly, engaging, and informative."
            },
            {
                "role": "user",
                "content": "Please provide for me information regarding my tips and shifts. First, which shifts should I drop? Second, what shifts do I not work that I should pick up? Lastly, where are my earnings below and above and by how much?"
            }
        ]

        tips = user.get('tips', [])
        rest_stats = user.get('restaurant', {}).get('statistics', [])

        shift_counts = get_shift_counts(tips)
        formatted_stats = convert_restaurant_statistics(rest_stats)
        formatted_tip_averages = convert_tips_to_averages(tips)

        drop_shift_response = should_user_drop_shifts(shift_counts, formatted_stats)
        get_shift_response = should_user_get_shifts(shift_counts, formatted_stats)
        below_average_response, above_average_response = where_is_user_below_or_above_average(formatted_tip_averages, formatted_stats)
        
        # print()
        # print('shifts to drop')
        # print(drop_shift_response)
        # print()

        # print('shifts to pick up')
        # print(get_shift_response)
        # print()

        # print('shifts below average')
        # print(below_average_response)
        # print('shifts above average')
        # print(above_average_response)
        # print()



        messages.append(get_shift_response)
        for message in below_average_response:
            messages.append(message)
        for message in above_average_response:
            messages.append(message)
        messages.append(drop_shift_response)
        print('messages', messages)
        # print()
        # print('the average tips for all employees for a given shift by day and shift')
        # print(formatted_stats)
        # print()
        # print('the average tips for this emplooyee for a given shift by day and shift')
        # print(formatted_tip_averages)
        # print()

        response = ''
        try:
            completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages = messages
            )
            response = completion.choices[0].message.content
            print(completion.choices[0].message.content)
        except Exception as e:
            print("The ERROR:", e)
            response = e

        print('response', response)
        return make_response({'response': response}, 200)









# Next OAuth create / update database
@app.route('/oauth/update', methods=['POST'])
def update_database():
    if request.method == 'POST':
        data = request.get_json()
        res = update_database_with_oauth(data)
        return res








# Custom OAuth Route (Currently not in use)

# @app.route('/oauth/token-exchange', methods=['POST'])
# def exchange_token():
#     if request.method == 'POST':
#         authCode = request.get_json()
#         token_url = 'https://oauth2.googleapis.com/token'

#         payload = {
#             'code': authCode,
#             'client_id': os.environ.get('GOOGLE_CLIENT_ID'),
#             'client_secret': os.environ.get('GOOGLE_CLIENT_SECRET'),
#             'redirect_uri': os.environ.get('GOOGLE_CALLBACK_URI'),
#             'grant_type': 'authorization_code',
#         }

#         # POST to OAuth to get token
#         response = requests.post(token_url, data=payload)

#         if response.status_code == 200:
#             token_data = response.json()
#             access_token = token_data.get('access_token')

#             # GET to OAuth to get user data
#             user_info_url = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + access_token
#             user_info_response = requests.get(user_info_url)

#             if user_info_response.status_code == 200:
#                 user_info = user_info_response.json()

#                 res = update_database_with_oauth(user_info)
#                 return res

#             else:
#                 return make_response({'error': 'Failed to retrieve user data'}, 422)
#         else:
#             return make_response({'error': 'Failed to retriever oauth access token'}, 422)

#         return make_response(user_info, 200)

if __name__ == '__main__':
    app.run(port=5555, debug=True)