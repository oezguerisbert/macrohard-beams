import { ParticipantInterface } from '../Participant';
const Mike = {
  name: "Mike",
  audioFile: "audio/why-you-calling-me.mp3",
  profile: "pfp/fancy-spongebob.jpg",
  state: "stop",
  muted: false,
  traits: [
    {
      name: "first-week",
      color: "bg-red-200 text-red-500"
    },
    {
      name: "intern",
      color: "bg-green-200 text-green-600"
    }
  ],
  tags: [
    "noob",
    "expert",
    "remote-work"
  ]
} as ParticipantInterface;
export default Mike;