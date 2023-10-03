from flask import request, make_response
from flask_restful import Api, Resource

from models import User, Restaurant
from config import app, db

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

        except:
            return make_response({'error': 'Failed to Create User'}, 422)
        print(new_user.to_dict())
        response = make_response(new_user.to_dict(), 201)
        return response

api.add_resource(Users, '/users')

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter(User.username == data['username'])
        if not user:
            return make_response({'error': 'Username Not Found'}, 422)
        if not user.authenticate():
            return make_response({'error': 'Password Does Not Match'}, 401)
        return make_response(user.to_dict(), 200)

api.add_resource(Login, '/login')

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