import model.prophet_model as pm
from flask_restful import Resource
from flask import request,jsonify



class prediction(Resource):
    def __init__(self):
        self.model = pm.MODEL()
    def post(self):
        args = request.json
        print(args)
        symbol = args.get('symbol')
        param = args.get('param')
        period = args.get('period')
        if period==None or period<0:
            period=30
        if symbol==None:
            symbol='AAPL'
        if param==None:
            param='Close'
        print(symbol, param, period)

        forecast = self.model.getPrediction(symbol, param, period)
        forecast = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper', 'trend', 'trend_lower', 'trend_upper']]
        forecast['ds'] = forecast['ds'].dt.strftime('%Y-%m-%d %H:%M:%S')
        # forecast = forecast.to_dict('records')
        forecast = forecast[-2*(period): ]
        return jsonify(forecast.to_dict('records'))

    def get(self):
        symbol = 'AAPL'
        param = 'Close'
        period = 30
        forecast = self.model.getPrediction(symbol, param, period)
        forecast = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]
        forecast['ds'] = forecast['ds'].dt.strftime('%Y-%m-%d %H:%M:%S')
        forecast = forecast.to_dict('records')
        return jsonify(forecast)