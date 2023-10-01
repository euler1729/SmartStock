import yfinance as yf
# import pandas as pd
from flask_restful import Resource
import json
from flask import request, jsonify


symbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "JPM", "V", "NVDA", "BRK-A",
                   "JNJ", "PYPL", "HD", "DIS", "BAC", "MA", "ADBE", "XOM", "UNH", "T",
                   "INTC", "VZ", "PFE", "CSCO", "WMT", "ABT", "CRM", "KO", "PEP", "WFC",
                   "CMCSA", "CVX", "MRK", "BA", "PM", "TMO", "NKE", "MCD", "PYPL", "NFLX",
                   "AVGO", "QCOM", "TXN", "TGT", "CAT", "LMT", "ORCL", "MDT", "AON", "SPG"
           #    "TJX", "USB", "MMM", "CVS", "AMGN", "AXP", "LOW", "BKNG", "COST", "GS",
           #    "SCHW", "C", "FDX", "MET", "COP", "RTX", "DUK", "MO", "GILD", "AEP",
           #    "DOW", "SO", "PLD", "EMR", "CCI", "BDX", "REGN", "VRTX", "ADI", "CL",
           #    "TEL", "KMB", "ATVI", "TMUS", "ZTS", "HON", "SYK", "ECL",
           #    "EQR", "PSA", "KMI", "REG", "SLB", "DHR", "ADP", "CHTR", "IQV",
           #    "SPGI", "KHC", "K", "AMAT", "WBA", "HUM", "CME", "BK", "NOC", "GPN",
           ]


class topStocks(Resource):

    def post(self):

        symbol_string = ' '.join(symbols) + ''
        ticker = yf.Tickers(symbol_string)

        db = ticker.history(period="2d")  # Fetch data for the last trading day

        stock_data = []
        # print(db)
        # print(db.columns)
        for symbol in symbols:

            current_price = db[('Close', symbol)].iloc[-1]
            previous_close = db[('Close', symbol)].iloc[-2]
            change = current_price - previous_close
            percentage_change = (change / previous_close) * \
                100 if previous_close != 0 else 0
            volume = db[('Volume', symbol)].iloc[-1]
            direction = 0
            if change > 0:
                direction = 1
            elif change < 0:
                direction = -1

            # Create a DataFrame for the current stock
            stock_data.append({
                "symbol": symbol,
                "current_price": round(current_price,2),
                "price_change": round(change,2),
                "percent_change": round(percentage_change, 2),
                "up": int((direction)),
                "volume": int(round(volume)),
            })

        gainers = sorted(
            stock_data, key=lambda x: x['price_change'], reverse=True)[:5]

        # Sort the stock_data list by price_change in ascending order to get losers
        losers = sorted(
            stock_data, key=lambda x: x['price_change'])[:5]

        # Sort the stock_data list by volume in descending order to get highest volume
        highest_volume = sorted(stock_data, key=lambda x: float(
            x['volume'])*float(x['current_price']), reverse=True)[:5]

        result = [{
            "gainers": gainers,
            "losers": losers,
            "highest_volume": highest_volume
        }]

        # js = json.dumps(result)

        return jsonify(result)

    def get(self):

        return 'get request topFive'
