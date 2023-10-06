import os
import requests
from flask import request, make_response
from flask_restful import Api, Resource


from models import User, Restaurant
from config import app, db
from database import update_database_with_oauth

api = Api(app)

class Users(Resource):
    def post(self):
        image = request.files.get('file').read()
        username = request.form.get('username')
        role = request.form.get('role')
        password = request.form.get('password')

        new_user = User(
            username = username,
            role = role,
            password_hash = password
        )
        try:
            db.session.add(new_user)
            db.session.commit()

            save_path = 'images/{}.jpg'.format(new_user.id)
            with open(save_path, 'wb') as file:
                file.write(image)

            new_user.image = save_path
            db.session.add(new_user)
            db.session.commit()
        except:
            return make_response({'error': 'Failed to Create User'}, 422)
        print(new_user.to_dict())
        response = make_response(new_user.to_dict(), 201)
        return response

api.add_resource(Users, '/users')

class UserByEmail(Resource):
    def get(self, email):
        user = User.query.filter(User.email == email).first()
        if not user:
            return make_response({'error': "User Not Found"}, 404)
        return make_response(user.to_dict(), 200)

api.add_resource(UserByEmail, '/user/<string:email>')

class CheckSession(Resource):
    def get(self):

        user = User.query.filter(User.id == session.get('user_id')).first()
        if not user:
            return make_response({'error': 'Unauthorized'}, 401)
        else:
            image_path = 'images/{}'.format(user.id)

            # Read the image file and encode it as base64
            with open(image_path, "rb") as image_file:
                image_data = base64.b64encode(image_file.read()).decode('utf-8')

            # Create a response JSON containing user data and the base64-encoded image
            response_data = {
                "user_data": user.to_dict(),
                "image_data": image_data
            }
            return make_response(response_data, 200)


api.add_resource(CheckSession, '/check_session')





# Next OAuth create / update database
@app.route('/oauth/update', methods=['POST'])
def update_database():
    if request.method == 'POST':
        data = request.get_json()
        res = update_database_with_oauth(data)
        return res








# Custom OAuth Route (Currently not in use)

@app.route('/oauth/token-exchange', methods=['POST'])
def exchange_token():
    if request.method == 'POST':
        authCode = request.get_json()
        token_url = 'https://oauth2.googleapis.com/token'

        payload = {
            'code': authCode,
            'client_id': os.environ.get('GOOGLE_CLIENT_ID'),
            'client_secret': os.environ.get('GOOGLE_CLIENT_SECRET'),
            'redirect_uri': os.environ.get('GOOGLE_CALLBACK_URI'),
            'grant_type': 'authorization_code',
        }

        # POST to OAuth to get token
        response = requests.post(token_url, data=payload)

        if response.status_code == 200:
            token_data = response.json()
            access_token = token_data.get('access_token')

            # GET to OAuth to get user data
            user_info_url = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + access_token
            user_info_response = requests.get(user_info_url)

            if user_info_response.status_code == 200:
                user_info = user_info_response.json()

                res = update_database_with_oauth(user_info)
                return res

            else:
                return make_response({'error': 'Failed to retrieve user data'}, 422)
        else:
            return make_response({'error': 'Failed to retriever oauth access token'}, 422)

        return make_response(user_info, 200)

if __name__ == '__main__':
    app.run(port=5555, debug=True)