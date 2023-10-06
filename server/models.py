from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
# from sqlalchemy.ext.associationproxy import association_proxy
from config import bcrypt, db, app

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    role = db.Column(db.String)
    image = db.Column(db.String)

    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))
    restaurant = db.relationship('Restaurant', back_populates='users', cascade="all, delete-orphan", single_parent=True)

        
class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    users = db.relationship('User', back_populates='restaurant', cascade='all, delete-orphan')

    serialize_rules = ('-users.restaurant',)