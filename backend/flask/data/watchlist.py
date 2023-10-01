from flask_restful import Resource
from flask import request, jsonify
import yfinance as yf


class watchlist(Resource):
    def post(self):
        arg = request.json
        symbols = arg.get('symbols')
        symbols_str = ' '.join(arg.get('symbols'))
        print(symbols_str)
        print(len(symbols))

        if len(symbols) > 1:
            ticker = yf.Tickers(symbols_str)
        else:
            ticker = yf.Ticker(symbols_str)

        db = ticker.history(period="2d")  # Fetch data for the last trading day

        stock_data = []

        if len(symbols) == 1:
            
            current_price = (db['Close']).iloc[1]
            prev_price = (db['Close']).iloc[0]

            change = current_price - prev_price
            percentage_change = (change / prev_price) * \
                100 if prev_price != 0 else 0
            volume = (db['Volume']).iloc[1]
            dividend = (db['Dividends']).iloc[1] if 'Dividends' in db.columns else 0
            stock_split = (db['Stock Splits']).iloc[1] if 'Stock Splits' in db.columns else 0
            open = (db['Open'])[1] if 'Open' in db.columns else 0
            high = (db['High'])[1]  if 'High' in db.columns else 0
            low = (db['Low'])[1]  if 'Low' in db.columns else 0
            close =(db['Close'])[1] if 'Close' in db.columns else 0
            direction = 0
            if change > 0:
                direction = 1
            elif change < 0:
                direction = -1

            stock_data.append({
                "symbol": symbols_str,
                "current_price": round(close, 2),
                "price_change": round(change, 2),
                "percent_change": round(percentage_change, 2),
                "up": int(direction),
                "volume": int(volume),
                "dividend": int(dividend),
                "stock_split": int(stock_split),
                "open": int(round(close, 2)),
                "high": int(round(high, 2)),
                "low": int(round(low, 2)),
                "close": int(round(close, 2))
            })
            print(stock_data)
            return jsonify(stock_data)
        else:
            for symbol in symbols:
                current_price = db[('Close', symbol)].iloc[-1]
                previous_close = db[('Close', symbol)].iloc[-2]
                change = current_price - previous_close
                percentage_change = (change / previous_close) * \
                    100 if previous_close != 0 else 0
                volume = db[('Volume', symbol)].iloc[-1]
                dividend = db[('Dividends', symbol)
                              ].iloc[-1] if ('Dividends', symbol) in db.columns else 0
                stock_split = db[('Stock Splits', symbol)
                                 ].iloc[-1] if ('Stock Splits', symbol) in db.columns else 0
                ltp = db[('LTP', symbol)].iloc[-1] if ('LTP',
                                                       symbol) in db.columns else 0
                ycp = db[('YCP', symbol)].iloc[-1] if ('YCP',
                                                       symbol) in db.columns else 0
                trade = db[('Trade', symbol)].iloc[-1] if ('Trade',
                                                           symbol) in db.columns else 0
                value = db[('Value', symbol)].iloc[-1] if ('Value',
                                                           symbol) in db.columns else 0
                open = db[('Open', symbol)].iloc[-1] if ('Open',
                                                         symbol) in db.columns else 0
                high = db[('High', symbol)].iloc[-1] if ('High',
                                                         symbol) in db.columns else 0
                low = db[('Low', symbol)].iloc[-1] if ('Low',
                                                       symbol) in db.columns else 0
                close = db[('Close', symbol)].iloc[-1] if ('Close',
                                                           symbol) in db.columns else 0
                direction = 0
                if change > 0:
                    direction = 1
                elif change < 0:
                    direction = -1

                # Create a DataFrame for the current stock

                stock_data.append({
                    "symbol": symbol,
                    "current_price": round(current_price, 2),
                    "price_change": round(change, 2),
                    "percent_change": round(percentage_change, 2),
                    "up": int(direction),
                    "volume": int(volume),
                    "dividend": int(dividend),
                    "stock_split": int(stock_split),
                    "ltp": int(round(ltp, 2)),
                    "ycp": int(round(ycp, 2)),
                    "trade": int(round(trade, 2)),
                    "value": int(value),
                    "open": int(round(open, 2)),
                    "high": int(round(high, 2)),
                    "low": int(round(low, 2)),
                    "close": int(round(close, 2))
                })
            return jsonify(stock_data)
