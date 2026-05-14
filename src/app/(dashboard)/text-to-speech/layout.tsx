import TextToSpeechLayout from "@/features/text-to-speech/view/text-to-speech-layout";
import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return <TextToSpeechLayout>{children}</TextToSpeechLayout>;
}

export default Layout;
