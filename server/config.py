from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Development CORS
CORS(app, supports_credentials=True, origin='*')
