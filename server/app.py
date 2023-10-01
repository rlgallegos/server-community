from flask import request
from flask_restful import Api, Resource


from config import app

api = Api(app)

class User(Resource):
    def post(self):
        image = request.files.get('file').read()
        username = request.form.get('username')
        print('username', username)

        if image:
            save_path = 'images/new_image.jpg'
            with open(save_path, 'wb') as file:
                file.write(image)

api.add_resource(User, '/user')



if __name__ == '__main__':
    app.run(port=5555, debug=True)