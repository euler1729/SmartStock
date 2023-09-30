import yfinance as yf
import pandas as pd
from flask_restful import Resource
from flask import request, jsonify




class news(Resource):
    
        def post(self):
            args = request.json
            print(args)
            symbols = args.get('symbols')
            ticks = yf.Tickers(symbols)
            return jsonify(ticks.news())
            