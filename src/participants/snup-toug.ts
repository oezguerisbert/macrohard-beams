import { ParticipantInterface } from '../Participant';
const SnupToug = {
  name: "Snup Toug",
  audioFile: "audio/snup.mp3",
  profile: "pfp/snup-toug.png",
  state: "stop",
  muted: false,
  volume: 0.01,
  traits: [
    {
      name: "ContentDog",
      color: "bg-yellow-500 text-red-600"
    }
  ],
  isBot: true,
  tags: [
    "music",
    "nap-master"
  ]
} as ParticipantInterface;

export default SnupToug;