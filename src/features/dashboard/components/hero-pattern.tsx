import { WavyBackground } from "@/components/ui/wavy-background";

export function HeroPattern() {
  return (
    <div className="pointer-events-none absolute hidden inset-0 overflow-hidden lg:block">
      <WavyBackground
        backgroundFill="hsl(0 0% 100%)"
        colors={[
          "#00DC33", // primary green
          "#00B828", // darker green
          "#4DFF73", // light neon green
          "#00FF88", // mint green
        ]}
        blur={3}
        speed="slow"
        waveOpacity={0.1}
        waveWidth={60}
        waveYOffset={250}
        containerClassName="h-full"
        className="hidded"
      />
    </div>
  );
}
