from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import numpy as np
import librosa
from prediction.prediction import RFprediction, LSTMprediction, SVMprediction
from preprocessing import create_mfcc

app = Flask(__name__)
CORS(app)

@app.route("/api/python/predict", methods=['POST'])
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
    if (method == 'LSTM'):
        result = LSTMprediction(feature)
    if (method == 'RF'):
        result = RFprediction(feature)
    response = {"result": result}
    return jsonify(response)