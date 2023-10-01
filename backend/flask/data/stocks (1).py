import yfinance as yf
import pandas as pd
from flask_restful import Resource
from flask import request
import json
from flask import jsonify



symbols = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "JPM", "V", "NVDA", "BRK-A",  
    "JNJ", "PYPL", "HD", "DIS", "BAC", "MA", "ADBE", "XOM", "UNH", "T", 
    "INTC", "VZ", "PFE", "CSCO", "WMT", "ABT", "CRM", "KO", "PEP", "WFC", 
    "CMCSA", "CVX", "MRK", "BA", "PM", "TMO", "NKE", "MCD", "PYPL", "NFLX", 
    "AVGO", "QCOM", "TXN", "TGT", "CAT", "LMT", "ORCL", "MDT", "AON", "SPG",
    "TJX", "USB", "MMM", "CVS", "AMGN", "AXP", "LOW", "BKNG", "COST", "GS",
    "SCHW", "C", "FDX", "MET", "COP", "RTX", "DUK", "MO", "GILD", "AEP",
    "DOW", "SO", "PLD", "EMR", "CCI", "BDX", "REGN", "VRTX", "ADI", "CL", 
    "TEL", "KMB", "ATVI", "TMUS", "ZTS", "HON", "SYK", "ECL",
    "EQR", "PSA", "KMI", "REG", "SLB", "DHR", "ADP", "CHTR", "IQV",
    "SPGI", "KHC", "K", "AMAT", "BTC-USD", "ETH-USD", "BNB-USD", "ADA-USD", "XRP-USD", "SOL-USD", "DOT-USD", "DOGE-USD", "AVAX-USD",
]





class stocks(Resource):

    def post(self):

        offset = int(request.json['offset'])
        
        last = min(len(symbols), offset + 10)
        symbol_string = ' '.join(symbols[offset:last])
        tmp_symbols = symbols[offset:last]

        print(symbol_string)
        print(tmp_symbols)

        ticker = yf.Tickers(symbol_string)

        db = ticker.history(period="2d")  # Fetch data for the last trading day

        stock_data = []

        
        for symbol in tmp_symbols:
            current_price = db[('Close', symbol)].iloc[-1]
            previous_close = db[('Close', symbol)].iloc[-2]
            change = current_price - previous_close
            percentage_change = (change / previous_close) * 100 if previous_close != 0 else 0
            volume = db[('Volume', symbol)].iloc[-1]
            dividend = db[('Dividends', symbol)].iloc[-1] if ('Dividends', symbol) in db.columns else 0
            stock_split = db[('Stock Splits', symbol)].iloc[-1] if ('Stock Splits', symbol) in db.columns else 0
            ltp = db[('LTP', symbol)].iloc[-1] if ('LTP', symbol) in db.columns else 0
            ycp = db[('YCP', symbol)].iloc[-1] if ('YCP', symbol) in db.columns else 0
            trade = db[('Trade', symbol)].iloc[-1] if ('Trade', symbol) in db.columns else 0
            value = db[('Value', symbol)].iloc[-1] if ('Value', symbol) in db.columns else 0
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
                "percent_change": percentage_change,
                "up_down": str(direction),
                "volume": str(volume),
                "dividend": str(dividend),
                "stock_split": str(stock_split),
                "ltp": str(ltp),
                "ycp": str(ycp),
                "trade": str(trade),
                "value": str(value)

            })

        

        return jsonify(stock_data)

    def get(self):
        

        return 'get request stocks'


