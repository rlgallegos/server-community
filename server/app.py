from flask import request
from flask_restful import Api, Resource

from models import User, Restaurant
from config import app, db

api = Api(app)

class Users(Resource):
    def post(self):
        image = request.files.get('file').read()
        username = request.form.get('username')
        role = request.form.get('role')
        print(username, "-", role)

        new_user = User(
            user = username,
            role = role
        )
        try:
            save_path = 'images/{}.jpg'.format(username)
            with open(save_path, 'wb') as file:
                file.write(image)
            new_user.image = save_path
        except:
            print('Failed to Save Image')
            return
        try:
            db.session.add(new_user)
            db.session.commit()
        except:
            print('Failed to Create User')
            return

        response = make_response(new_user.to_dict(), 201)
        return response

            

api.add_resource(Users, '/users')

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