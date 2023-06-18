import AudioUploader from '@/src/components/audioExtraction';
import AudioInput from '@/src/components/audioInput';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 wrapper">
      <div className='App-card mt-8'>
      <div className='App-card-Item'>
        <h1 className="font-bold text-lg App-title">Emotion recognition through sound</h1>
        <AudioInput />
      </div>
      </div>
    </main>
  )
}