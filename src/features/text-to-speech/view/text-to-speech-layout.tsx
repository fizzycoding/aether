import { PageHeader } from "@/components/page-header";
import { ReactNode } from "react";

export default function TextToSpeechLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <PageHeader title="Text To Speech" />
      {children}
    </div>
  );
}
