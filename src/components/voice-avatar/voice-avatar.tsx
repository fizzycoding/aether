"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useVoiceAvatar } from "./use-voice-avatar";
import { cn } from "@/lib/utils";

interface VoiceAvatarProps {
  seed: string;
  name?: string;
  className?: string;
}

export function VoiceAvatar({ seed, name, className }: VoiceAvatarProps) {
  const src = useVoiceAvatar(seed);

  return (
    <Avatar className={cn("size-4 border-white shadow-xs", className)}>
      <AvatarImage src={src} />
      <AvatarFallback className="text-[8px]">
        {name?.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
