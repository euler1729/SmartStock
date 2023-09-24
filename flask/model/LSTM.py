from flask_restful import Resource

class lstm(Resource):
    def get(self):
        return "This is LSTM"