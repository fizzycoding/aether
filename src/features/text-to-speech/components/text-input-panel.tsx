import { COST_PER_CHARACTER, TEXT_MAX_LENGTH } from "../data/constants";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Coins } from "lucide-react";
import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { ttsFormOptions } from "./text-to-speech-form";
import { useStore } from "@tanstack/react-form";
import { GenerateButton } from "./generate-button";

export default function TextInputPanel() {
  const form = useTypedAppFormContext(ttsFormOptions);
  const text = useStore(form.store, (s) => s.values.text);
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);
  const isValid = useStore(form.store, (s) => s.isValid);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="relative min-h-0 flex-1">
        <form.Field name="text">
          {(field) => (
            <Textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Type or paste your script here"
              className="resize-none absolute inset-0 border-0 bg-transparent p-4 pb-6 lg:p6 text-base! leading-relaxed tracking-tight shadow-none wrap-break-word focus-visible:ring-0"
              maxLength={TEXT_MAX_LENGTH}
            />
          )}
        </form.Field>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-background to-transparent" />
      </div>

      <div className="shrink-0 p-4 lg:p-6">
        <div className="flex flex-col gap-3 lg:hidden">
          <GenerateButton
            className="w-full"
            disabled={isSubmitting}
            isSubmitting={isSubmitting}
            onSubmit={() => form.handleSubmit()}
          />
        </div>

        {text.length > 0 ? (
          <div className="hidden items-center justify-between lg:flex">
            <Badge variant="outline" className="gap-1.5 border-dashed">
              <Coins className="size-3 text-chart-5" />
              <span className="text-xs">
                <span className="tabular-nums">
                  ${(text.length * COST_PER_CHARACTER).toFixed(4)}
                </span>
                &nbsp; estimated
              </span>
            </Badge>
            <div className="flex items-center gap-3">
              <p className="text-xs tracking-tight">
                {text.length.toLocaleString()}
                <span className="text-muted-foreground">
                  &nbsp;/&nbsp;{TEXT_MAX_LENGTH.toLocaleString()} characters
                </span>
              </p>
              <GenerateButton
                size="sm"
                disabled={isSubmitting || !isValid}
                isSubmitting={isSubmitting}
                onSubmit={() => form.handleSubmit()}
              />
            </div>
          </div>
        ) : (
          <div className="hidden lg:block">
            <p className="mb-2 text-xs text-foreground/80">
              Get started by typing
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
