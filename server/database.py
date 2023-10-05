from config import db
from models import User
from flask import make_response

def update_database_with_oauth(data):
    user = User.query.filter(User.google_id == data['id']).first()

    # user already exists
    if user:
        return make_response(user.to_dict(), 200)

    # new user
    else:
        new_user = User(
            google_id = data['id'],
            name = data['name'],
            image = data['picture'],
            email = data['email']
        )
        try:
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(), 201)
        except Exception as e:
            print(e)
            return make_response({'error': 'Failed to create new user'}, 422)




# GOOGLE AUTH DATA (for later use if necessary)
# {
#   email: 'rlgallegos85@gmail.com',
#   family_name: 'Gallegos',
#   given_name: 'Robert',
#   id: '104149366513844669158',
#   locale: 'en',
#   name: 'Robert Gallegos',
#   picture: 'https://lh3.googleusercontent.com/a/ACg8ocK8ryY8TGHDS6OYceSgIedtmnA0hs8q34wvqRBepBWB=s96-c',
#   verified_email: true
# }