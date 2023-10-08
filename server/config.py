import os
import redis
from dotenv import load_dotenv
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_migrate import Migrate
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

app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, supports_credentials=True, origin='http://localhost:4000')

db.init_app(app)



# Redis Configurations
redis_host = 'localhost'
redis_port = 6379

# Establish a connection to the Redis server
redis_client = redis.StrictRedis(host=redis_host, port=redis_port, decode_responses=True)
