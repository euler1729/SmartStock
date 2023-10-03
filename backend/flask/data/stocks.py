import yfinance as yf
import pandas as pd
from flask_restful import Resource
from flask import request
import json
from flask import jsonify
from threading import Thread



symbols = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "JPM", "V", "NVDA", "BRK-A",  
    "JNJ", "PYPL", "HD", "DIS", "MA", "ADBE", "XOM", "UNH", "T", 
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
    def __init__(self):
        self.stock_data = []

    def getStock(self, symbol):
        ticker = yf.Ticker(symbol)
        data = ticker.history('2d')
        length = len(data)
        if length==0:
            return
        

        if data['Close'].isna().all():
            data['Close'].fillna(0, inplace=True)
        else:
            data['Close'].fillna(data['Close'].mean(), inplace=True)


        if data['Volume'].isna().all():
            data['Volume'].fillna(0, inplace=True)
        else:
            data['Volume'].fillna(data['Volume'].mean(), inplace=True)


        if data['Dividends'].isna().all():
            data['Dividends'].fillna(0, inplace=True)
        else:
            data['Dividends'].fillna(data['Dividends'].mean(), inplace=True)


        if data['Stock Splits'].isna().all():
            data['Stock Splits'].fillna(0, inplace=True)
        else:
            data['Stock Splits'].fillna(data['Stock Splits'].mean(), inplace=True)
        
        if data['High'].isna().all():
            data['High'].fillna(0, inplace=True)
        else:
            data['High'].fillna(data['High'].mean(), inplace=True)

        if data['Low'].isna().all():
            data['Low'].fillna(0, inplace=True)
        else:
            data['Low'].fillna(data['Low'].mean(), inplace=True)

        if length==1:
            self.stock_data.append({
                "symbol": symbol,
                "current_price": round(data["Close"][0], 2),
                "price_change": round(0, 2),
                "percent_change": round(0, 2),
                "up": int(1),
                "volume": int(data["Volume"][0]),
                "dividend": int(data["Dividends"][0]),
                "stock_split": int(data["Stock Splits"][0]),
                "open": int(round(data["Close"][0], 2)),
                "high": int(round(data["High"], 2)),
                "low": int(round(data["Low"][0], 2)),
                "close": int(round(data["Close"][0], 2))
            })
            return
        

        current_price = data['Close'][1] 
        prev_price = data['Close'][0]
        change = current_price - prev_price
        percentage_change = (change / prev_price) * 100
        direction = 1 if change > 0 else -1
        volume = data['Volume'][1]
        dividend = data['Dividends'][1]
        stock_split = data['Stock Splits'][1]
        openn = data['Open'][1]
        high = data['High'][1]
        low = data['Low'][1]
    
        self.stock_data.append({
            "symbol": symbol,
            "current_price": round(current_price, 2),
            "price_change": round(change, 2),
            "percent_change": round(percentage_change, 2),
            "up": int(direction),
            "volume": int(volume),
            "dividend": int(dividend),
            "stock_split": int(stock_split),
            "open": int(round(openn, 2)),
            "high": int(round(high, 2)),
            "low": int(round(low, 2)),
            "close": int(round(current_price, 2))
        })


    def post(self):

        offset = int(request.json['offset'])
        
        last = min(len(symbols), offset + 15)
        # symbol_string = ' '.join(symbols[offset:last])
        tmp_symbols = symbols[offset:last]

        threads = []
        for symbol in tmp_symbols:
            thread = Thread(target=self.getStock, args=(symbol,))
            thread.start()
            threads.append(thread)

        for t in threads:
            t.join()
            
        return jsonify(self.stock_data)

    def get(self):
        

        return 'get request stocks'


