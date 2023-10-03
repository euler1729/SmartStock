from flask_restful import Resource
from flask import request, jsonify
import yfinance as yf
from threading import Thread


class watchlist(Resource):

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
        direction = 1 if change > 0 else 0
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
        arg = request.json
        symbols = arg.get('symbols')
        
        threads = []
        for symbol in symbols:
            thread = Thread(target=self.getStock, args=(symbol,))
            thread.start()
            threads.append(thread)
        for i in threads:
            i.join()
            
        return jsonify(self.stock_data)
       
