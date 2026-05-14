import TextToSpeechView from "@/features/text-to-speech/view/text-to-speech-view";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Text To Speech",
  description: "Convert text to speech",
};

export default function TextToSpeechPage() {
  return <TextToSpeechView />;
}
