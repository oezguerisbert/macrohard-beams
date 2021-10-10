import React from 'react';
import { ChatAlt2Icon, ChatAltIcon, ChatIcon, ClockIcon, CogIcon, LightningBoltIcon, MicrophoneIcon, PhoneIcon, PhoneMissedCallIcon, PlusIcon, ShareIcon, UploadIcon, XIcon } from '@heroicons/react/outline';
import fancySpongebob from './pfp/fancy-spongebob.jpg';
import harshProjectManager from './pfp/manager.png';
import elmo from './pfp/elmo.png';
import { Message } from './Message';
import { Transition } from '@headlessui/react';

function App() {
  const [startCall, setStartCall] = React.useState(false);
  const [microphone, setMicrophone] = React.useState(false);
  return (
    <div className="flex flex-col justify-center items-center bg-gray-900 h-screen">
      <Transition show={startCall} 
      className="absolute bottom-2"
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0">
        <div className="flex flex-row w-max bg-gray-800 rounded-full h-16 p-2 space-x-2">
          <button type="button" className={`flex w-12 h-12 ${microphone ? "bg-green-500" : "bg-blue-500"} transition-colors rounded-full justify-center items-center text-white`} onClick={() => {setMicrophone((mic) => !mic)}}>
            <MicrophoneIcon className="w-6 h-6"/>
          </button>
          <button type="button" className="flex w-12 h-12 bg-gray-700 rounded-full justify-center items-center text-white">
            <ChatIcon className="w-6 h-6"/>
          </button>
          <button type="button" className="flex w-12 h-12 bg-gray-700 rounded-full justify-center items-center text-white">
            <UploadIcon className="w-6 h-6"/>
          </button>
          <button type="button" className="flex w-12 h-12 bg-gray-700 rounded-full justify-center items-center text-white">
            <CogIcon className="w-6 h-6"/>
          </button>
          <button type="button" className="flex w-12 h-12 bg-red-500 rounded-full justify-center items-center text-white" onClick={() => {setStartCall(false);}}>
            <XIcon className="w-6 h-6"/>
          </button>
        </div>
      </Transition>
      <Transition 
      show={!startCall} 
      className="absolute bottom-2"
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0">
        <div className="flex flex-row w-max bg-gray-800 rounded-full h-16 p-2 space-x-2">
          <button type="button" className="flex w-12 h-12 bg-green-500 transition-colors rounded-full justify-center items-center text-white" onClick={()=>{setStartCall(true);}}>
            <PhoneIcon className="w-6 h-6"/>
          </button>
          <button type="button" className="flex w-12 h-12 bg-white rounded-full justify-center items-center text-gray-700">
            <ChatIcon className="w-6 h-6"/>
          </button>
          <button type="button" className="flex w-12 h-12 bg-red-500 rounded-full justify-center items-center text-white" >
            <PhoneMissedCallIcon className="w-6 h-6"/>
          </button>
        </div>
      </Transition>
      <div className="flex flex-col w-max rounded-full h-max fixed top-2 right-4 space-y-4">
        <button type="button" className="flex w-12 h-12 bg-black transition-colors rounded-full justify-center items-center text-white">
          <div className="flex flex-col w-full h-full items-center justify-center">
            <LightningBoltIcon className="w-7 h-7 text-yellow-400"/>
            <div className="flex bg-red-500 text-white w-max px-1 h-4 rounded-full absolute mt-8 -right-2 text-xs">3875+</div>
          </div>
        </button>
        <button type="button" className="flex w-12 h-12 transition-colors rounded-full justify-center items-center text-white">
          <Message text="dude, prod is down. 🤣🤣">
            <div className="flex flex-col w-full h-full items-center justify-center overflow-hidden rounded-full">
              <img alt="" src={elmo} className="scale-100 w-full h-full"/>
              <div className="flex bg-white text-red-500 w-5 justify-center items-center px-1 h-5 rounded-full absolute mt-8 right-1 text-sm">5</div>
            </div>
          </Message>
        </button>
        <button type="button" className="flex w-12 h-12 bg-gray-700 transition-colors rounded-full justify-center items-center text-white">
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        show={!startCall}
      >
        <div className="flex flex-row space-x-10 transition-all scale-150">
          <div className="w-full flex flex-col space-x-10">
            <div className="w-max h-20 flex flex-row">
              <div className="flex flex-row">
                <div className="w-20 h-full absolute bg-gray-700 rounded-full p-1 animate-ping"></div>
                <div className="w-20 h-full bg-blue-700 rounded-full p-1">
                  <div className="bg-gray-900 w-full h-full rounded-full p-1">
                    <div className="flex flex-row bg-black w-full h-full rounded-full overflow-hidden">
                      <img alt="" src={harshProjectManager} className="scale-100 w-full h-full"/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-start p-4 text-white">
                <div className="flex flex-row w-full space-x-2 items-center">
                  <span className="text-2xl w-full">Project Manager</span>
                </div>
                <div className="space-x-1 w-full">
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        show={startCall}
      >
        <div className="flex flex-row space-x-10 transition-all scale-150">
          <div className="flex flex-col max-w-lg">
            <div className="w-max h-20 flex flex-row">
              <div className={`w-20 h-full ${microphone ? "bg-green-500" : "bg-blue-500"} transition-colors rounded-full p-1`}>
                <div className="bg-gray-900 w-full h-full rounded-full p-1">
                  <div className="bg-black w-full h-full rounded-full overflow-hidden">
                    <img alt="" src={fancySpongebob} className="scale-100 w-full h-full"/>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-start p-4 text-white">
                <div className="w-full flex flex-row space-x-2 justify-center items-center">
                  <span className="text-2xl mr-auto">Mike</span>
                  <div className="w-max h-full flex flex-row-reverse items-center space-x-reverse space-x-2">
                    <span className="text-sm text-yellow-600 bg-yellow-200 rounded-full py-1 px-3">first-week</span>
                    <span className="text-sm text-red-600 bg-red-300 rounded-full py-1 px-3">intern</span>
                  </div>
                </div>
                <span className="text-lg text-gray-600">#remote-work #noob #expert</span>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col space-x-10">
            <div className="w-max h-20 flex flex-row">
              <div className="w-20 h-full bg-blue-700 rounded-full p-1">
                <div className="bg-gray-900 w-full h-full rounded-full p-1">
                  <div className="flex flex-row bg-black w-full h-full rounded-full overflow-hidden">
                    <img alt="" src={harshProjectManager} className="scale-100 w-full h-full"/>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-start p-4 text-white">
                <div className="flex flex-row w-full space-x-2 items-center">
                  <span className="text-2xl w-full">Project Manager</span>
                  <div className="w-full flex flex-row-reverse items-center">
                    <span className="text-sm text-red-600 bg-red-300 rounded-full py-1 px-3">Master of Disaster</span>
                  </div>
                </div>
                <div className="space-x-1 w-full ">
                  <span className="text-lg text-gray-600">#work247 #hustle #kubernetes #aws #ml</span>
                  <span className="text-lg text-gray-700">+27 more</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default App;
