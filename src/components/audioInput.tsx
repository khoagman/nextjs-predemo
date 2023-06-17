'use client'

import { useState } from "react"
import AudioUploader from "./audioExtraction";
import { fetchEmotion } from "../util/fetchEmotion";

export default function AudioInput() {
    const [audioData, setAudioData] = useState<Float32Array | null>(null);
    const [rate, setRate] = useState(48000);
    const handleAudioDataExtracted = (audioData: Float32Array, sampleRate: number) => {
        setAudioData(audioData);
        setRate(sampleRate);
      };

    const handleClick = async () => {
        if (audioData === null) {
            console.log('Please uploading an audio first');
        }
        else {
            const audio_array = Array.from(audioData);
            const data = {
                method: 'LSTM',
                rate: rate,
                numeric: audio_array
            }
            console.log('Send data', JSON.stringify(data));
            const result = await fetchEmotion(JSON.stringify(data));
            console.log('Result:', result);
        }
    }
    
    console.log(audioData);
    console.log(rate);

    return (
        <div>
            <AudioUploader onAudioDataExtracted={handleAudioDataExtracted} />
            <button onClick={handleClick}>
                Click me
            </button>
        </div>
    )
}