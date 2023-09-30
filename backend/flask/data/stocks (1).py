import yfinance as yf
import pandas as pd
from flask_restful import Resource
from flask import request
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



        



class stocks(Resource):

    def post(self):
        
        symbol_string = ' '.join(symbols) + ''
        ticker = yf.Tickers(symbol_string)

        db = ticker.history(period="2d")  # Fetch data for the last trading day

        stock_data = []
        print(db)
        print(db.columns)
        for symbol in symbols:
            
            current_price = db[('Close', symbol)].iloc[-1]
            previous_close = db[('Close', symbol)].iloc[-2]
            change = current_price - previous_close
            percentage_change = (change / previous_close) * 100 if previous_close != 0 else 0
            volume = db[('Volume', symbol)].iloc[-1]
            direction = 0
            if change > 0:
                direction = 1
            elif change < 0:
                direction = -1
            

            # Create a DataFrame for the current stock
            stock_data.append({
                "symbol": symbol,
                "current_price": current_price,
                "price_change": change,
                "perchange_change": percentage_change,
                "up_down": direction,
            })

        js = json.dumps(stock_data)

        return js

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


