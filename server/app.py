from flask import request
from flask_restful import Api, Resource

from config import app

api = Api(app)

class User(Resource):
    def post(self):
        data = request.get_json()
        print(data)


api.add_resource(User, '/user')



if __name__ == '__main__':
    app.run(port=5555, debug=True)