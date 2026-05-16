import TextToSpeechView from "@/features/text-to-speech/view/text-to-speech-view";
import { HydrateClient, trpc } from "@/trpc/server";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Text To Speech",
  description: "Convert text to speech",
};

export default async function TextToSpeechPage({
  searchParams,
}: {
  searchParams: Promise<{ text: string; voiceId?: string }>;
}) {
  const { text, voiceId } = await searchParams;
  await trpc.voices.getAll.prefetch();

  return (
    <HydrateClient>
      <TextToSpeechView initialValue={{ text, voiceId }} />;
    </HydrateClient>
  );
}
