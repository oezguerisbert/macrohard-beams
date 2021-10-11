import { Transition } from "@headlessui/react";
import {
  ChatIcon,
  CogIcon,
  LightningBoltIcon,
  MicrophoneIcon,
  PhoneIcon,
  PhoneMissedCallIcon,
  PlusIcon,
  UploadIcon,
  XIcon
} from "@heroicons/react/outline";
import AudioMotionAnalyzer from "audiomotion-analyzer";
import React from "react";
import { Message } from "./Message";
import elmo from "./pfp/elmo.png";
import fancySpongebob from "./pfp/fancy-spongebob.jpg";
import harshProjectManager from "./pfp/manager.png";


function App() {
  const startingCallSound = new Audio('audio/effects/dial-up.mp3');
  const mikeSound = new Audio('audio/why-you-calling-me.mp3');
  const managerSound = new Audio('audio/stereo-test.mp3');
  const [staringCallAudio, setStaringCallAudio] = React.useState(startingCallSound);
  const [mikeAudio, setMikeAudio] = React.useState(mikeSound);
  const [managerAudio, setManagerAudio] = React.useState(managerSound);
  const startingCallAudioMotionAnalyser = new AudioMotionAnalyzer(undefined, { useCanvas: false, source: startingCallSound });
  const mikeAudioMotionAnalyser = new AudioMotionAnalyzer(undefined, { useCanvas: false, source: mikeSound });
  const managerAudioMotionAnalyser = new AudioMotionAnalyzer(undefined, { useCanvas: false, source: managerSound });

  const [startCall, setStartCall] = React.useState(false);
  const [callEnded, setCallEnded] = React.useState(false);
  const [microphoneMike, setMicrophoneMike] = React.useState(false);
  const [microphoneMikeMuted, setMicrophoneMikeMuted] = React.useState(false);
  const [microphoneManager, setMicrophoneManager] = React.useState(false);
  const closeCall = () => {
    setStartCall(false);
    setCallEnded(true);
  };
  const keybindHandlerUp = (event: any) => {
    switch (event.key) {
      case "n":
        setMicrophoneMike(false);
        break;
      case "c":
        setMicrophoneManager(false);
        break;
    }
  };
  const keybindHandlerDown = (event: any) => {
    switch (event.key) {
      case "i":
        mikeAudio?.pause();
        mikeAudio.currentTime = 0;
        mikeAudio?.play();
        break;
      case "m":
        managerAudio?.pause();
        managerAudio.currentTime = 0;
        managerAudio?.play();
        break;
      case "n":
        setMicrophoneMike(true);
        break;
      case "c":
        setMicrophoneManager(true);
        break;
    }
  };

  React.useEffect(() => {
    if (startCall) {
      startingCallSound?.play();
      setTimeout(() => {
        mikeAudio?.play();
        // managerAudio?.play();
        startingCallSound?.pause();

      }, 4000);
    }
  }, [startCall]);

  React.useEffect(() => {
    let audioInterval = setInterval(() => {
      setMicrophoneMike(mikeAudioMotionAnalyser.getEnergy() * 100 > 2);
      setMicrophoneManager(managerAudioMotionAnalyser.getEnergy() * 100 > 2);
    }, 10);
    document.body.addEventListener("keyup", keybindHandlerUp);
    document.body.addEventListener("keydown", keybindHandlerDown);
    return () => {
      clearInterval(audioInterval);
      document.body.removeEventListener("keyup", keybindHandlerUp);
      document.body.removeEventListener("keydown", keybindHandlerDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col justify-center items-center bg-gray-900 h-screen">
      <Transition
        show
        className="absolute top-2"
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className="flex flex-row w-max h-16 p-2 space-x-2 text-white">
          <span>Macrohard Beams</span>
          <span>
            <LightningBoltIcon className="w-6 h-6 text-yellow-400" />
          </span>
        </div>
      </Transition>
      <Transition
        show={startCall}
        className="absolute bottom-2"
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className="flex flex-row w-max bg-gray-800 rounded-full h-16 p-2 space-x-2">
          <button
            type="button"
            className={`flex w-12 h-12 ${!microphoneMikeMuted || !mikeAudio.played || mikeAudio.paused
              ? mikeAudio.played && !mikeAudio.paused
                ? "bg-green-500"
                : "bg-blue-500"
              : "bg-red-500"
              } rounded-full justify-center items-center text-white`}
            onClick={() => {
              setMicrophoneMikeMuted((mic) => !mic);
            }}
          >
            <MicrophoneIcon className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="flex w-12 h-12 bg-gray-700 rounded-full justify-center items-center text-white"
          >
            <ChatIcon className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="flex w-12 h-12 bg-gray-700 rounded-full justify-center items-center text-white"
          >
            <UploadIcon className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="flex w-12 h-12 bg-gray-700 rounded-full justify-center items-center text-white"
          >
            <CogIcon className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="flex w-12 h-12 bg-red-500 rounded-full justify-center items-center text-white"
            onClick={() => {
              mikeAudio?.pause();
              mikeAudio.currentTime = 0;
              managerAudio?.pause();
              managerAudio.currentTime = 0;
              closeCall();
            }}
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
      </Transition>
      <Transition
        show={!startCall && !callEnded}
        className="absolute bottom-2"
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className="flex flex-row w-max bg-gray-800 rounded-full h-16 p-2 space-x-2">
          <button
            type="button"
            className="flex w-12 h-12 bg-green-500 transition-colors rounded-full justify-center items-center text-white"
            onClick={() => {
              setStartCall(true);
            }}
          >
            <PhoneIcon className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="flex w-12 h-12 bg-white rounded-full justify-center items-center text-gray-700"
          >
            <ChatIcon className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="flex w-12 h-12 bg-red-500 rounded-full justify-center items-center text-white"
          >
            <PhoneMissedCallIcon className="w-6 h-6" />
          </button>
        </div>
      </Transition>
      <Transition
        show={startCall}
        className="absolute right-0 top-0"
        enter="transition duration-1000 delay-1000 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-500 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className="flex flex-col w-max rounded-full h-max fixed top-2 right-4 space-y-4">
          <button
            type="button"
            className="flex w-12 h-12 bg-black transition-colors rounded-full justify-center items-center text-white"
          >
            <div className="flex flex-col w-full h-full items-center justify-center">
              <LightningBoltIcon className="w-7 h-7 text-yellow-400" />
              <div className="flex bg-red-500 text-white w-max px-1 h-4 rounded-full absolute mt-8 -right-2 text-xs">
                3875+
              </div>
            </div>
          </button>
          <button
            type="button"
            className="flex w-12 h-12 transition-colors rounded-full justify-center items-center text-white"
          >
            <Message user="elmo" text="Dude, prod is down. 🤣🤣">
              <div className="flex flex-col w-full h-full items-center justify-center overflow-hidden rounded-full">
                <img alt="" src={elmo} className="scale-100 w-full h-full" />
                <div className="flex bg-white text-red-500 w-5 justify-center items-center px-1 h-5 rounded-full absolute mt-8 right-1 text-sm">
                  5
                </div>
              </div>
            </Message>
          </button>
          <button
            type="button"
            className="flex w-12 h-12 bg-gray-700 transition-colors rounded-full justify-center items-center text-white"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      </Transition>
      <Transition
        enter="transition duration-100 delay-500 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-500 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        show={!startCall && !callEnded}
      >
        <div className="flex flex-row space-x-10 transition-all scale-150">
          <div className="w-full flex flex-col space-x-10">
            <div className="w-max h-20 flex flex-row">
              <div className="flex flex-row">
                <div className="w-20 h-full absolute bg-gray-700 rounded-full p-1 animate-ping"></div>
                <div className="w-20 h-full bg-blue-700 rounded-full p-1">
                  <div className="bg-gray-900 w-full h-full rounded-full p-1">
                    <div className="flex flex-row bg-black w-full h-full rounded-full overflow-hidden">
                      <img
                        alt=""
                        src={harshProjectManager}
                        className="scale-100 w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-start p-4 text-white">
                <div className="flex flex-row w-full space-x-2 items-center">
                  <span className="text-2xl w-full">Project Manager</span>
                </div>
                <div className="space-x-1 w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <Transition
        enter="transition duration-1000 delay-500 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-500 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        show={startCall}
      >
        <div className="flex flex-row space-x-10 transition-all scale-150">
          <div className="flex flex-col max-w-lg">
            <div className="w-max h-20 flex flex-row">
              <div
                className={`w-20 h-full ${!microphoneMikeMuted
                  ? microphoneMike
                    ? "bg-green-500"
                    : "bg-blue-500"
                  : "bg-red-500"
                  } transition-all duration-100 rounded-full p-1`}
                style={{
                  boxShadow: !microphoneMikeMuted
                    ? microphoneMike
                      ? "0px 0px 20px 0px rgba(12,185,129,0.5)"
                      : "none"
                    : "none",
                }}
              >
                <div className="bg-gray-900 w-full h-full rounded-full p-1">
                  <div className="bg-black w-full h-full rounded-full overflow-hidden">
                    <img
                      alt=""
                      src={fancySpongebob}
                      className="scale-100 w-full h-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-start p-4 text-white">
                <div className="w-full flex flex-row space-x-2 justify-center items-center">
                  <span className="text-2xl mr-auto">Mike</span>
                  <div className="w-max h-full flex flex-row-reverse items-center space-x-reverse space-x-2">
                    <span className="text-sm text-yellow-600 bg-yellow-200 rounded-full py-1 px-3">
                      first-week
                    </span>
                    <span className="text-sm text-red-600 bg-red-300 rounded-full py-1 px-3">
                      intern
                    </span>
                  </div>
                </div>
                <span className="text-lg text-gray-600">
                  #remote-work #noob #expert
                </span>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col space-x-10">
            <div className="w-max h-20 flex flex-row">
              <div
                className={`w-20 h-full ${microphoneManager ? "bg-green-500" : "bg-blue-500"
                  } transition-all duration-100 rounded-full p-1`}
                style={{
                  boxShadow: microphoneManager
                    ? "0px 0px 20px 0px rgba(16, 185, 129, 0.25)"
                    : "none",
                }}
              >
                <div className="bg-gray-900 w-full h-full rounded-full p-1">
                  <div className="flex flex-row bg-black w-full h-full rounded-full overflow-hidden">
                    <img
                      alt=""
                      src={harshProjectManager}
                      className="scale-100 w-full h-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-start p-4 text-white">
                <div className="flex flex-row w-full space-x-2 items-center">
                  <span className="text-2xl w-full">Project Manager</span>
                  <div className="w-full flex flex-row-reverse items-center">
                    <span className="text-sm text-red-600 bg-red-300 rounded-full py-1 px-3">
                      Master of Disaster
                    </span>
                  </div>
                </div>
                <div className="space-x-1 w-full ">
                  <span className="text-lg text-gray-600">
                    #work247 #hustle #kubernetes #aws #ml
                  </span>
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
