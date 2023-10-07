import os
import requests
from flask import request, make_response
from flask_restful import Api, Resource


from models import User, Restaurant
from config import app, db
from database import update_database_with_oauth
from helpers import save_to_imgur

api = Api(app)

# User

class UserByID(Resource):
    def patch(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({'error': "User Not Found"}, 401)
        
        # For updating image
        if ('file' in request.files):
            image = request.files.get('file').read()

            # Save to Imgur and Return Link
            save_path = save_to_imgur(user.id, image)

            try:
                user.image = save_path
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





# Custom


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