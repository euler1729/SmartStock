import yfinance as yf
import pandas as pd
from flask_restful import Resource
from flask import request


class Candle(Resource):

    
    def post(self):
        args = request.json
        print(args)
        symbol = args.get('symbol')
        interval = args.get('interval')
        period = args.get('period')
        print(symbol, interval, period)
        print(request.json)
        if symbol and interval and period:
            # Create a Yahoo Finance Ticker object
            ticker = yf.Ticker(symbol)

            # Fetch historical data
            hourly_data = ticker.history(period=period, interval=interval)

            # Process the data or return it as needed
            
            return hourly_data.to_json()
        else:
            return 'Missing parameters'


    def get(self):
        # Define the stock symbol (e.g., AAPL for Apple Inc.)
        symbol = 'AAPL'

        # Create a Yahoo Finance Ticker object
        ticker = yf.Ticker(symbol)

        # Get hourly data
        hourly_data = ticker.history(period='1d', interval='1h')

        # Configure Pandas options to display all rows and columns
        pd.set_option('display.max_rows', None)
        pd.set_option('display.max_columns', None)

        return hourly_data.to_object()