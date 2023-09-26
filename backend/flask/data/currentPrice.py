import yfinance as yf
import pandas as pd
from flask_restful import Resource
from flask import request


class currentPrice(Resource):

    
    def post(self):
        args = request.json
        
        symbol = args.get('symbol')
        
        if symbol:
            # Create a Yahoo Finance Ticker object
            ticker = yf.Ticker(symbol)

            # Fetch historical data
            price = ticker.info['currentPrice']

            # Process the data or return it as needed
            
            return {'symbol': symbol, 'currentPrice': price}
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

        return 'get request'