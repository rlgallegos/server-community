from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
# from sqlalchemy.ext.associationproxy import association_proxy
from config import bcrypt, db, app

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    role = db.Column(db.String)
    image = db.Column(db.String)

    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))
    restaurant = db.relationship('Restaurant', back_populates='users', cascade="all, delete-orphan", single_parent=True)

    serialize_rules = ('-_password_hash', '-restaurant.users, -restaurant_id')

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        hashed_password = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = hashed_password.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)


    users = db.relationship('User', back_populates='restaurant', cascade='all, delete-orphan')

    serialize_rules = ('-users.restaurant',)