import AudioUploader from '@/src/components/audioExtraction';
import AudioInput from '@/src/components/audioInput';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>LOZ</h1>
      <AudioInput />
    </main>
  )
}