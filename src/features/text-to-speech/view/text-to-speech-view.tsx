"use client";

import TextInputPanel from "@/features/text-to-speech/components/text-input-panel";
import VoicePreviewPlaceholder from "@/features/text-to-speech/components/voice-preview-placeholder";
import { SettingsPanel } from "@/features/text-to-speech/components/setting-pannel";
import {
  TextToSpeechForm,
  defaultTTSValues,
} from "@/features/text-to-speech/components/text-to-speech-form";

export default function TextToSpeechView() {
  return (
    <TextToSpeechForm defaultValues={defaultTTSValues}>
      <div className="flex flex-1 overflow-hidden min-h-0">
        <div className="flex min-h-0 flex-1 flex-col">
          <TextInputPanel />
          <VoicePreviewPlaceholder />
        </div>
        <SettingsPanel />
      </div>
    </TextToSpeechForm>
  );
}
