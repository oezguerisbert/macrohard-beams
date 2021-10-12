import React from 'react'
import AudioMotionAnalyzer from 'audiomotion-analyzer';
export type ParticipantState = 'play' | 'pause' | 'stop';
export interface ParticipantInterface {
  audioFile: string;
  profile: string;
  muted: boolean;
  state: ParticipantState;
  name: string;
}
export const Participant: React.FC<ParticipantInterface> = ({ audioFile, state, profile, name, muted }) => {
  const participantSound = new Audio(audioFile);

  const [microphone, setMicrophone] = React.useState(false);
  const participantAudioMotionAnalyser = new AudioMotionAnalyzer(undefined, { useCanvas: false, source: participantSound });

  React.useEffect(() => {
    if (state === "play") {
      setTimeout(() => { participantSound.play(); }, 100);
      let audioInterval = setInterval(() => {
        setMicrophone(participantAudioMotionAnalyser.getEnergy() * 100 > 2);
      }, 10);
      return () => {
        clearInterval(audioInterval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return (
    <div className="flex flex-col max-w-lg">
      <div className="w-max h-20 flex flex-row">
        <div
          className={`w-20 h-full ${!muted
            ? microphone
              ? "bg-green-500"
              : "bg-blue-500"
            : "bg-red-500"
            } transition-all duration-100 rounded-full p-1`}
          style={{
            boxShadow: !muted
              ? microphone
                ? "0px 0px 20px 0px rgba(12,185,129,0.5)"
                : "none"
              : "none",
          }}
        >
          <div className="bg-gray-900 w-full h-full rounded-full p-1">
            <div className="bg-black w-full h-full rounded-full overflow-hidden">
              <img
                alt=""
                src={profile}
                className="scale-100 w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-start p-4 text-white">
          <div className="w-full flex flex-row space-x-2 justify-center items-center">
            <span className="text-2xl mr-auto">{name}</span>
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
  )
}

export default Participant
