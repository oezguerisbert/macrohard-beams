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
import {
  LightningBoltIcon as LBI
} from "@heroicons/react/solid";
import React from "react";
import Caller from "./Caller";
import { Message } from "./Message";
import Participant, { ParticipantInterface } from './Participant';
import Manager from "./participants/manager";
import Mike from "./participants/mike";
import SnupToug from "./participants/snup-toug";



function App() {
  const participantList = [Mike, Manager];
  const [participants, setParticipants] = React.useState<ParticipantInterface[]>(participantList);

  const [startCall, setStartCall] = React.useState(false);
  const [callEnded, setCallEnded] = React.useState(false);

  const closeCall = () => {

    setStartCall(false);
    setCallEnded(true);
  };

  React.useEffect(() => {
    if (startCall) {
      setParticipants(ps => ps.map((p) => { p.state = "play"; return p; }))
      // participants.forEach((p) => { p.state = 'play'; });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startCall]);
  return (
    <div className="flex flex-col justify-center items-center bg-[#050505] h-screen">
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
            <LBI className="w-6 h-6 text-yellow-300" />
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
            className={`flex w-12 h-12 ${!participants[0].muted
              ? participants[0].state === "play"
                ? "bg-green-500"
                : "bg-blue-500"
              : "bg-red-500"
              } rounded-full justify-center items-center text-white`}
            onClick={() => {
              setParticipants((p) => p.map((p, i) => { if (i === 0) { p.muted = !p.muted; return p } else { return p } }))
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
              setParticipants(ps => ps.map((p) => { p.state = "stop"; return p; }));
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
            className="cursor-default flex w-12 h-12 bg-transparent rounded-full justify-center items-center text-gray-700"
          />
          <button
            type="button"
            className="cursor-default flex w-12 h-12 bg-transparent rounded-full justify-center items-center text-gray-700"
          />
          <button
            type="button"
            className="flex w-12 h-12 bg-red-500 rounded-full justify-center items-center text-white"
            onClick={() => { setCallEnded(true) }} >
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
                <img alt="" src="pfp/elmo.png" className="scale-100 w-full h-full" />
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
        <Caller name="Project Manager" skip={startCall || callEnded} profile="pfp/pm-normal.png" />
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
        <div className={`${participants.length > 2 ? `grid-flow-row grid-rows-${participants.length}` : `grid-flow-col grid-cols-${participants.length}`}  grid w-full h-max gap-16 transition-all scale-150 justify-center items-center`}>
          {participants.map((p, i) => <Participant key={i} {...p} />)}
        </div>
      </Transition>
    </div>
  );
}

export default App;
