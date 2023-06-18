'use client'

import { useState } from "react"
import AudioUploader from "./audioExtraction";
import { fetchEmotion } from "../util/fetchEmotion";
import { ChangeEventHandler } from 'react';

export default function AudioInput() {
    const [audioData, setAudioData] = useState<Float32Array | null>(null);
    const [rate, setRate] = useState(48000);
    const [model, setModel] = useState('');
    const [emo, setEmo] = useState('');

    const handleAudioDataExtracted = (audioData: Float32Array, sampleRate: number) => {
        setAudioData(audioData);
        setRate(sampleRate);
      };
    const handleClick = async () => {
        if (audioData === null) {
            alert('Please uploading an audio first');
        }
        else {
            const audio_array = Array.from(audioData);
            const data = {
                method: model,
                rate: rate,
                numeric: audio_array
            }
            const result = await fetchEmotion(JSON.stringify(data));
            setEmo(result.result);
            
        }
    }
    const HandleRadioChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setModel(e.target.value);
    }

    return (
        <div>
            <AudioUploader onAudioDataExtracted={handleAudioDataExtracted} />
            <h3 className="mt-4 select-title">Please select the model you want:</h3>
            <div className="m-4">
                <input type="radio" id="svm" name="model" value="SVM" onChange={HandleRadioChange}  />
                <label htmlFor="svm">SVM</label>
            </div>
            <div className="m-4">
                <input type="radio" id="randomforest" value="RF" name="model" onChange={HandleRadioChange}/>
                <label htmlFor="randomforest" >Random Forest</label>
            </div>
            <div className="m-4">
                <input type="radio" id="lstm" value="LSTM" name="model" onChange={HandleRadioChange}/>
                <label htmlFor="lstm">LSTM</label>
            </div>
            <br />
            <button onClick={handleClick} className="Item-button">
                Predict
            </button>
            {emo && <div>Emotions: {emo}</div>}
        </div>
    )
}