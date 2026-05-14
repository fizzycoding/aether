"use client";

import { z } from "zod";
import { formOptions } from "@tanstack/react-form";
import { useAppForm } from "@/hooks/use-app-form";
import { ReactNode } from "react";

const ttsFormSchema = z.object({
  text: z.string().min(1, "Text is required"),
  voice: z.string().min(1, "Voice is required"),
  temperature: z.number().min(0).max(2),
  topP: z.number().min(0).max(1),
  topK: z.number().min(1).max(100),
  repetitionPenalty: z.number().min(1).max(2),
});

export type TTSFormValues = z.infer<typeof ttsFormSchema>;

export const defaultTTSValues: TTSFormValues = {
  text: "",
  voice: "",
  temperature: 0.8,
  topP: 0.95,
  topK: 1000,
  repetitionPenalty: 1.2,
};

export const ttsFormOptions = formOptions({
  defaultValues: defaultTTSValues,
});

export function TextToSpeechForm({
  children,
  defaultValues,
}: {
  children: React.ReactNode;
  defaultValues?: TTSFormValues;
}) {
  const form = useAppForm({
    ...ttsFormOptions,
    defaultValues: defaultValues ?? defaultTTSValues,
    validators: {
      onSubmit: ttsFormSchema,
    },
    onSubmit: () => {},
  });

  return <form.AppForm>{children}</form.AppForm>;
}
