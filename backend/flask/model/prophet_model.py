import yfinance as yf
from prophet import Prophet
# import numpy as np
# import pandas as pd
# from sklearn.preprocessing import MinMaxScaler
# from keras.models import Sequential
# from keras.layers import Dense, LSTM
# from datetime import datetime
# from keras.models import Sequential
# from keras.layers import Dense
# from keras.layers import LSTM
# from sklearn.metrics import mean_absolute_error


class MODEL:
    def getPrediction(symbol, param, period):
        ticker = yf.Ticker(symbol)
        data = ticker.history(period='max')
        df = data.reset_index()
        df[['ds', 'y']] = df[['Date', param]]
        df['ds'] = df['ds'].dt.tz_localize(None)

        model = Prophet(daily_seasonality=True, holidays_prior_scale='US')
        model.fit(df)

        future = model.make_future_dataframe(period)
        forecast = model.predict(future)
        return forecast
