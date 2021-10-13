import React from 'react'
import AudioMotionAnalyzer from 'audiomotion-analyzer';
import { VolumeOffIcon } from '@heroicons/react/outline';
export type ParticipantState = 'play' | 'pause' | 'stop';


export interface ParticipantInterface {
  audioFile: string;
  profile: string;
  muted: boolean;
  state: ParticipantState;
  name: string;
  traits: Array<{ name: string; color: string }>
  tags: Array<string>
  isBot?: boolean;
  volume: number;
}

export const Participant: React.FC<ParticipantInterface> = ({ audioFile, state, profile, name, muted, traits, tags,
  volume = 1, isBot = false }) => {
  let participantAudioMotionAnalyser: AudioMotionAnalyzer;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [participantSound, setParticipantSound] = React.useState<HTMLAudioElement>(new Audio(audioFile));
  const [microphoneLevel, setMicrophoneLevel] = React.useState(0);
  React.useEffect(() => {
    participantSound.volume = volume;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    participantAudioMotionAnalyser = new AudioMotionAnalyzer(undefined, { useCanvas: false, source: participantSound });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [prevVolume, setPrevVolume] = React.useState(volume);

  React.useEffect(() => {
    switch (state) {
      case "play":
        setTimeout(() => { participantSound.play(); }, 100);
        let audioInterval = setInterval(() => {
          setMicrophoneLevel(participantAudioMotionAnalyser.getEnergy() * 100);
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
      <div className="w-full h-20 flex flex-row">
        <div
          className={`w-20 h-full ${isBot ? 'bg-white' : !muted && participantSound.volume !== 0
            ? microphoneLevel > 2
              ? "bg-green-500"
              : "bg-blue-500"
            : "bg-red-500"
            } transition-all duration-100 rounded-full p-1`}
          style={{
            boxShadow: !muted && participantSound.volume !== 0
              ? microphoneLevel > 2
                ? `0px 0px 0px ${Math.min(microphoneLevel * 8, 40)}px rgba(12,185,129,0.1)`
                : "none"
              : "none",
          }}
        >
          <div className="flex bg-gray-900 w-full h-full rounded-full p-1" onClick={() => {
            setPrevVolume(participantSound.volume);
            if (participantSound.volume !== 0) {
              participantSound.volume = 0;
            } else {
              participantSound.volume = prevVolume;
            }
          }}>
            <div className="flex bg-black w-full h-full rounded-full overflow-hidden cursor-pointer">
              <img
                alt=""
                src={profile}
                className="flex scale-100 w-full h-full"
              />
              {(participantSound.volume === 0 || muted) && <div className="absolute rounded-full flex w-16 h-16 bg-black bg-opacity-50 text-white justify-center items-center">
                <VolumeOffIcon className="w-5 h-5" />
              </div>}
            </div>
          </div>
        </div>
        <div className="w-max flex flex-col justify-center items-start p-4 text-white">
          <div className="w-max flex flex-row space-x-2 items-center">
            <span className="text-2xl mr-auto">{name}</span>
            <div className="w-max h-full flex flex-row items-center justify-end space-x-2">
              {traits.map((trait, i) => (<span key={i} className={`opacity-70 text-xs ${trait.color} rounded-full py-1 px-3 `}>
                {trait.name}
              </span>))}
            </div>
          </div>
          <span className="text-lg space-x-2 text-gray-600 flex flex-row overflow-ellipsis">
            {tags.slice(0, 4).map((t, i) => (<span key={i}>#{t}</span>))}
            {tags.length > 4 && (<span>+{tags.length - 4} more</span>)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Participant
