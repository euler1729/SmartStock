import yfinance as yf
# import pandas as pd
from flask_restful import Resource
from flask import request, jsonify




class news(Resource):
    
        def post(self):
            args = request.json
            # print(args)
            symbols = args.get('symbols')
            ticks = yf.Tickers(symbols)
            news = ticks.news()
            # print(news)
            clusters = []
            for symbol in symbols:
                if news[symbol]:
                    arr = news[symbol]
                    for x in arr:
                        clusters.append(x)
            # clusters.sort(key=lambda x: x['providerPublishTime'], reverse=True)

            return jsonify(clusters)
            