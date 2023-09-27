import yfinance as yf
import pandas as pd
from flask_restful import Resource
from flask import request, jsonify
import threading
import concurrent
import json


symbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "JPM", "V", "NVDA", "BRK-A",
                   "JNJ", "PYPL", "HD", "DIS", "BAC", "MA", "ADBE", "XOM", "UNH", "T",
                   "INTC", "VZ", "PFE", "CSCO", "WMT", "ABT", "CRM", "KO", "PEP", "WFC",
                   "CMCSA", "CVX", "MRK", "BA", "PM", "TMO", "NKE", "MCD", "PYPL", "NFLX",
                   "AVGO", "QCOM", "TXN", "TGT", "CAT", "LMT", "ORCL", "MDT", "AON", "SPG",
                   "TJX", "USB", "MMM", "CVS", "AMGN", "AXP", "LOW", "BKNG", "COST", "GS",
                   "SCHW", "C", "FDX", "MET", "COP", "RTX", "DUK", "MO", "GILD", "AEP",
                   "DOW", "SO", "PLD", "EMR", "CCI", "BDX", "REGN", "VRTX", "ADI", "CL",
                   "TEL", "KMB", "ATVI", "TMUS", "ZTS", "HON", "SYK", "ECL",
                   "EQR", "PSA", "KMI", "REG", "SLB", "DHR", "ADP", "CHTR", "IQV",
                   "SPGI", "KHC", "K", "AMAT", "WBA", "HUM", "CME", "BK", "NOC", "GPN",
           ]

stock_data_frames = []

# fuction to fetch data


def fetch_stock_data(symbol):
    # Create a Yahoo Finance Ticker object
    ticker = yf.Ticker(symbol)

    # Fetch historical data for the stock
    data = ticker.history(period="2d", interval="1d")

    if not data.empty:
        # Get the current price
        current_price = data['Close'].iloc[-1]

        # Calculate changes in price and percentage
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

        # Create a DataFrame for the current stock
        stock_df = pd.DataFrame({
            "symbol": [symbol],
            "current_price": [current_price],
            "price_change": [price_change],
            "percent_change": [percent_change],
            "up": [direction]
        })
        # print(stock_df)
        # Append the DataFrame to the list
        stock_data_frames.append(stock_df)


class stocks(Resource):

    def post(self):

        threads = []
        i = 0
        for symbol in symbols:
            i += 1
            if i>30:
                break
            thread = threading.Thread(target=fetch_stock_data, args=(symbol,))
            threads.append(thread)
            thread.start()

        for thread in threads:
            thread.join()
        # jsonList = json.dumps(stock_data_frames)
        df = pd.concat(stock_data_frames, ignore_index=True)
        # print(stock_data_frames.to_dict('records'))
        # print(df.to_dict())
        # print(df.to_numpy())
        return jsonify(df.to_dict('records'))

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
