import model.prophet_model as pm
from flask_restful import Resource
from flask import request,jsonify



class prediction(Resource):
    def post(self):
        args = request.json
        print(args)
        symbol = args.get('symbol')
        param = args.get('param')
        period = args.get('period')
        print(symbol, param, period)

        model = pm.MODEL()
        forecast = model.getPrediction(symbol, param, period)
        forecast = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]
        forecast['ds'] = forecast['ds'].dt.strftime('%Y-%m-%d %H:%M:%S')
        forecast = forecast.to_dict('records')
        return jsonify(forecast)

    def get(self):
        symbol = 'AAPL'
        param = 'Close'
        period = 30
        forecast = pm.MODEL.getPrediction(symbol, param, period)
        forecast = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]
        forecast['ds'] = forecast['ds'].dt.strftime('%Y-%m-%d %H:%M:%S')
        forecast = forecast.to_dict('records')
        return jsonify(forecast)