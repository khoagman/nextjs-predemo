from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import numpy as np
import librosa
from prediction.prediction import LSTMprediction, SVMprediction, RFprediction
from preprocessing import create_mfcc

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/python/predict", methods=['POST'])
@cross_origin()
def predict():
    result = 'Something wrong !'
    data = request.get_json()
    method = data['method']
    rate = data['rate']
    data = np.array(data['numeric'])
    resample_data = librosa.resample(data,orig_sr=rate,target_sr=22050)
    feature = create_mfcc(resample_data, 22050)
    if (method == 'SVM'):
        result = SVMprediction(feature)
    elif (method == 'RF'):
        result = RFprediction(feature)
    elif (method == 'LSTM'):
        result = LSTMprediction(feature)
    response = {"result": result}
    return jsonify(response)