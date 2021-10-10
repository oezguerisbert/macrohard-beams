import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { ChatIcon, MicrophoneIcon } from '@heroicons/react/outline';

function App() {

  const {
    transcript,
    listening,
    resetTranscript
  } = useSpeechRecognition({ clearTranscriptOnListen: true, transcribing: true});
  const [isListening, setIsListening] = React.useState(false);
  
  const toggleMic = (event:any) => {
    if(!listening){
      SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);
    }else {
      SpeechRecognition.stopListening();
      setIsListening(false);
    }
  }
  useEffect(() => {
    console.log(transcript);
    if(listening){
      console.log("Listening...");
      setTimeout(() => {
        resetTranscript();
      }, 2_000);
    }
  }, [listening, transcript, resetTranscript]);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div> you suck.</div>
  }
  return (
    <div className="flex flex-col justify-center items-center bg-gray-900 h-screen">
      <div className="flex flex-row w-max bg-gray-800 rounded-full h-16 absolute bottom-2 p-2 space-x-2">
        <button type="button" className={`flex w-12 h-12 ${listening ? 'bg-blue-700': 'bg-yellow-700'} transition-colors rounded-full justify-center items-center text-white`} onClick={toggleMic}>
        <MicrophoneIcon className="w-6 h-6"/>
        </button>
        <button type="button" className="flex w-12 h-12 bg-gray-700 rounded-full justify-center items-center text-white"><ChatIcon className="w-6 h-6"/></button>
      </div>
      <div className="flex flex-row space-x-10 transition-all">
        <div className="flex flex-col space-y-10 max-w-md">
          <div className="w-max h-20 flex flex-row">
            <div className={`w-20 h-full bg-${isListening ? 'green': 'blue'}-700 transition-colors rounded-full p-1`}>
              <div className="bg-gray-900 w-full h-full rounded-full p-1">
                <div className="bg-black w-full h-full rounded-full">
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start p-4 text-white">
              <span className="text-2xl">Lazy Mike</span>
              <span className="text-lg text-gray-600">#remote-work #do-not-disturb</span>
            </div>
          </div>
          <div className="w-max h-20 flex flex-row">
            <span className="text-white text-3xl text-center max-w-md">{transcript}</span>
          </div>
        </div>
        {/* <div className="flex flex-col space-y-10">
          <div className="w-max h-20 flex flex-row">
            <div className={`w-20 h-full bg-blue-700 rounded-full p-1`}>
              <div className="bg-gray-900 w-full h-full rounded-full p-1">
                <div className="bg-black w-full h-full rounded-full">
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start p-4 text-white">
              <span className="text-2xl">Master of Disaster</span>
              <span className="text-lg text-gray-600">#work #hustle #ml #kubernetes</span>
            </div>
          </div>
          <div className="w-max h-20 flex flex-row">
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
