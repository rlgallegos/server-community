from config import db
from models import User
from flask import make_response

def update_database_with_oauth(data):
    user = User.query.filter(User.email == data['email']).first()

    # user already exists
    if user:
        return make_response(user.to_dict(), 200)

    # new user
    else:
        new_user = User(
            name = data['name'],
            image = data['image'],
            email = data['email']
        )
        try:
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(), 201)
        except Exception as e:
            print(e)
            return make_response({'error': 'Failed to create new user'}, 422)


# Google Next Auth example data:
# 1. email: "example@gmail.com"
# 2. image: "https://lh3.googleusercontent.com/a/ACg8ocK8ryY8TGHDS6OYceSgIedtmnA0hs8q34wvqRBepBWB=s96-c"
# 3. name: "That Guy"