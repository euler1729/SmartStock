import yfinance as yf
# import pandas as pd
from flask_restful import Resource
from flask import request, jsonify




class news(Resource):
    
    def post(self):
        args = request.json
        # print(args)
        symbols = args.get('symbols')
        str = ' '.join(symbols)
        print(str)
        ticks = yf.Ticker(str)
        news = ticks.news
        
        return {
            'news': news
        }
            