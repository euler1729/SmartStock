from flask_restful import Resource

class lstm(Resource):
    def get(self):
        print("This is LSTM")
        return "This is LSTM"