import os
import requests
from flask import request, make_response, session
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

class Login(Resource):
    def post(self):
        print('entering login once')
        data = request.get_json()
        user = User.query.filter(User.username == data['username']).first()
        print('username:', user.username)
        if not user:
            return make_response({'error': 'Username Not Found'}, 422)
        if not user.authenticate(data['password']):
            return make_response({'error': 'Password Does Not Match'}, 401)

        session['user_id'] = user.id
        session['role'] = user.role

        # session.permanent = True
        response = make_response(user.to_dict(), 200)
        return response

api.add_resource(Login, '/login')

class CheckSession(Resource):
    def get(self):
        if 'user_id' not in session:
            print('session not found')
            return
        # print(session.get('user_id'))
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


# Custom OAuth Route
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
        print(response.status_code)

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
                return make_response({'error': 'Failed to retrieve user data'})
        else:
            return make_response({'error': 'Failed to retriever oauth access token'})

        return make_response(user_info, 200)










# class User(Resource):
#     def patch(self):
#         image = request.files.get('file').read()
#         username = request.form.get('username')
#         print('username', username)

#         if image:
#             save_path = 'images/new_image.jpg'
#             with open(save_path, 'wb') as file:
#                 file.write(image)

# api.add_resource(User, '/user')



if __name__ == '__main__':
    app.run(port=5555, debug=True)