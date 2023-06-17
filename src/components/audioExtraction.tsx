'use client'

import React, { ChangeEvent } from 'react';

interface AudioUploaderProps {
  onAudioDataExtracted: (audioData: Float32Array, sampleRate: number) => void;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ onAudioDataExtracted }) => {
  const handleAudioUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;

        const audioContext = new AudioContext();
        audioContext.decodeAudioData(arrayBuffer).then((audioBuffer) => {
          const audioData = audioBuffer.getChannelData(0);
          const sampleRate = audioBuffer.sampleRate;
          onAudioDataExtracted(audioData, sampleRate);
        }).catch((error) => {
          console.error('Error decoding audio file:', error);
        });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleAudioUpload} />
    </div>
  );
};

export default AudioUploader;