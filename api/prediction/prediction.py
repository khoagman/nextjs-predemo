import os
import tensorflow as tf
from tensorflow.keras.models import load_model
import joblib
import numpy as np
from sklearn.preprocessing import MinMaxScaler

def LSTMprediction(feature):
    length = len(feature)
    x = feature.reshape((1,length,1))
    pred = lstm_model.predict(x)
    y_num = np.argmax(pred[0])
    return trans(y_num)

def SVMprediction(feature):
    length = len(feature)
    x = feature.reshape((1,length))
    x = scaler.fit_transform(x)
    pred = svm_model.predict(x)
    return pred[0].capitalize()

def RFprediction(feature):
    length = len(feature)
    x = feature.reshape((1,length))
    x = scaler.fit_transform(x)
    pred = rf_model.predict(x)
    return pred[0].capitalize()

os.environ['KMP_DUPLICATE_LIB_OK']='True'
scaler = MinMaxScaler(feature_range=(0,1))

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)

lstm_path = os.path.join(parent_dir, 'lstm.h5')
rf_path = os.path.join(parent_dir, 'rf.pkl')
svm_path = os.path.join(parent_dir, 'svm.pkl')


lstm_model = load_model(lstm_path)
svm_model = joblib.load(svm_path)
rf_model = joblib.load(rf_path)

def trans(y_num):
    if y_num == 0:
        return 'Angry'
    elif y_num == 1:
        return 'Disgust'
    elif y_num == 2:
        return 'Fearful'
    elif y_num == 3:
        return 'Happy'
    elif y_num == 4:
        return 'Neutral'
    elif y_num == 5:
        return 'Sad'
    elif y_num == 6:
        return 'Suprised'
    else:
        return 'Cannot specify'


