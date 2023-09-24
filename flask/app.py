import os
from dotenv import load_dotenv
import psycopg2
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from model.LSTM import lstm

# Load environment variables
load_dotenv()
# Create Flask app
app = Flask(__name__)
api = Api(app)

# Connect to database
conn = psycopg2.connect(os.getenv("DATABASE_URL_LOCAL"))


api.add_resource(lstm, '/lstm')

if __name__ == '__main__':
    app.run(debug=True)