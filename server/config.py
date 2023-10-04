import os
from dotenv import load_dotenv
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_migrate import Migrate
from flask_session import Session
from datetime import timedelta

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
app = Flask(__name__)

db = SQLAlchemy(metadata=metadata)
bcrypt = Bcrypt(app)

load_dotenv()


app.config['SECRET_KEY'] = os.environ.get('FLASK_APP_SECRET_KEY')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///server-community.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)

app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_INTERFACE'] = 'filesystem'
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['SESSION_COOKIE_SECURE'] = False
# app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_PERMANENT'] = True
# app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=30) 
# app.config['SESSION_COOKIE_NAME'] = 'test_cookie'
app.config['CORS_HEADERS'] = 'Content-Type'

print('configuring session')
Session(app)

CORS(app, supports_credentials=True, origin='http://localhost:4000')

db.init_app(app)
