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
            # Fetch data for the last trading day
            data = ticker.history(period="2d", interval="1d")

            if not data.empty:
                # Get the current price
                current_price = data['Close'].iloc[-1]

                # Calculate changes in price and percentage
                # Previous day's closing price
                previous_close = data['Close'].iloc[-2]
                price_change = current_price - previous_close
                percent_change = (price_change / previous_close) * 100

                # Determine if the price went up or down
                if price_change > 0:
                    direction = 1
                elif price_change < 0:
                    direction = -1
                else:
                    direction = 0

                # Return the stock information
                return {
                    'symbol': symbol,
                    'currentPrice': current_price,
                    'priceChange': price_change,
                    'percentChange': percent_change,
                    'up': direction
                }
            else:
                return 'No historical data available for this symbol'
        else:
            return 'Missing symbol parameter'

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
