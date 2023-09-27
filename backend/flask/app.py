# import os
# from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_restful import Api
from model.lstm import lstm
import py_eureka_client.eureka_client as eureka_client
from data.candle import Candle
from data.currentPrice import currentPrice
from data.stocks import stocks


# Load environment variables
# load_dotenv()

rest_port = 8050
eureka_client.init(eureka_server="http://localhost:8761/eureka",
                   app_name="flask",
                   instance_port=rest_port)

# Create Flask app
app = Flask(__name__)
api = Api(app)


# Connect to database
# conn = psycopg2.connect(os.getenv("DATABASE_URL_LOCAL"))


api.add_resource(lstm, '/lstm')
api.add_resource(Candle, '/candle')
api.add_resource(currentPrice, '/current-price')
api.add_resource(stocks, '/stocks')
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=rest_port,debug=True)