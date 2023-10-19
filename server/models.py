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
    imgur_delete_hash = db.Column(db.String)

    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))
    restaurant = db.relationship('Restaurant', back_populates='users', cascade="all, delete-orphan", single_parent=True)
    
    tips = db.relationship('Tip', back_populates='user', cascade='all, delete-orphan')


class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    users = db.relationship('User', back_populates='restaurant', cascade='all, delete-orphan')
    statistics = db.relationship('TipStatistic', back_populates='restaurant', cascade='all, delete-orphan')

    serialize_rules = ('-users.restaurant', '-statistics.restaurant')


class Tip(db.Model):
    __tablename__ = 'tips'

    id = db.Column(db.Integer, primary_key=True)
    tip_date = db.Column(db.Date)
    tip_time = db.Column(db.Time)
    day_night = db.Column(db.String)
    role = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='tips')


class TipStatistic(db.Model):
    __tablename__ = 'tip_statistics'

    id = db.Column(db.Integer, primary_key=True)
    day_of_week = db.Column(db.String)
    day_night = db.Column(db.String)
    role = db.Column(db.String)
    average_tip = db.Column(db.Float)
    num_tips = db.Column(db.Integer)

    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))
    restaurant = db.relationship('Restaurant', back_populates='statistics')

    def update_average(self, amount, change = 1):
        self.num_tip += change
        adjusted_avg = (self.average_tip + amount) / self.num_tips
        self.average_tip = adjusted_avg
        db.session.add(self)
        db.session.commit()