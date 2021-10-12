import React from 'react'
import AudioMotionAnalyzer from 'audiomotion-analyzer';
export type ParticipantState = 'play' | 'pause' | 'stop';

export interface ParticipantInterface {
  audioFile: string;
  profile: string;
  muted: boolean;
  state: ParticipantState;
  name: string;
  traits: Array<{ name: string; color: string }>
  tags: Array<string>
}

export const Participant: React.FC<ParticipantInterface> = ({ audioFile, state, profile, name, muted, traits, tags }) => {
  let participantAudioMotionAnalyser: AudioMotionAnalyzer;
  const [participantSound, setParticipantSound] = React.useState<HTMLAudioElement>(new Audio(audioFile));
  const [microphone, setMicrophone] = React.useState(false);

  React.useEffect(() => {
    participantAudioMotionAnalyser = new AudioMotionAnalyzer(undefined, { useCanvas: false, source: participantSound });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    switch (state) {
      case "play":
        setTimeout(() => { participantSound.play(); }, 100);
        let audioInterval = setInterval(() => {
          setMicrophone(participantAudioMotionAnalyser.getEnergy() * 100 > 2);
        }, 10);
        return () => {
          clearInterval(audioInterval);
        };
      case "pause":
        participantSound.pause();
        break;
      case "stop":
        participantSound.pause();
        participantSound.currentTime = 0;
        break;

      default:
        break;
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
                ? "0px 0px 40px 0px rgba(12,185,129,0.25)"
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
              {traits.map((trait) => (<span className={`text-sm ${trait.color} rounded-full py-1 px-3 `}>
                {trait.name}
              </span>))}
            </div>
          </div>
          <span className="text-lg text-gray-600 flex flex-row overflow-ellipsis">
            {tags.map((t) => (<span>#{t}</span>))}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Participant
