import { AudioLines, AudioWaveform } from "lucide-react";

export default function SettingsPanelHistory() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-8">
      <div className="relative flex w-25 items-center justify-center">
        <div className="absolute left-0 -rotate-30 rounded-full bg-muted p-3">
          <AudioLines className="size-4 text-muted-foreground" />
        </div>
        <div className="relative z-10 rounded-full bg-foreground p-3">
          <AudioWaveform className="size-4 text-background" />
        </div>
        <div className="absolute right-0 rotate-30 rounded-full bg-muted p-3">
          <AudioLines className="size-4 text-muted-foreground" />
        </div>
      </div>

      <p className="text-foreground tracking-tight font-semibold">
        No generation yet
      </p>
      <p className="text-muted-foreground text-center text-xs max-w-48">
        Generate your first audio to see it here.
      </p>
    </div>
  );
}
