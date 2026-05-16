"use client";

import { trpc } from "@/trpc/client";
import TextInputPanel from "@/features/text-to-speech/components/text-input-panel";
import VoicePreviewPlaceholder from "@/features/text-to-speech/components/voice-preview-placeholder";
import { SettingsPanel } from "@/features/text-to-speech/components/setting-pannel";
import {
  TextToSpeechForm,
  defaultTTSValues,
  type TTSFormValues,
} from "@/features/text-to-speech/components/text-to-speech-form";
import { TTSVoicesProvider } from "../contexts/tts-voices-context";

export default function TextToSpeechView({
  initialValue,
}: {
  initialValue: Partial<TTSFormValues>;
}) {
  const [voicesData] = trpc.voices.getAll.useSuspenseQuery();

  const contextValue = {
    customVoices: voicesData.custom,
    systemVoices: voicesData.system,
    allVoices: [...voicesData.custom, ...voicesData.system],
  };

  const fallbackVoiceId = contextValue.allVoices[0]?.id ?? "";

  const resolveVoiceId =
    initialValue.voiceId &&
    contextValue.allVoices.find((val) => val.id === initialValue.voiceId)
      ? initialValue.voiceId
      : fallbackVoiceId;

  const defaultValues: TTSFormValues = {
    ...defaultTTSValues,
    ...initialValue,
    voiceId: resolveVoiceId,
  };

  return (
    <TTSVoicesProvider value={contextValue}>
      <TextToSpeechForm defaultValues={defaultValues}>
        <div className="flex flex-1 overflow-hidden min-h-0">
          <div className="flex min-h-0 flex-1 flex-col">
            <TextInputPanel />
            <VoicePreviewPlaceholder />
          </div>
          <SettingsPanel />
        </div>
      </TextToSpeechForm>
    </TTSVoicesProvider>
  );
}
