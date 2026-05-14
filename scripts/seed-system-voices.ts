import "dotenv/config";

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { PrismaPg } from "@prisma/adapter-pg";

import { CANONICAL_SYSTEM_VOICE_NAMES } from "../src/features/voices/data/voice-scoping";
import { PrismaClient, VoiceCategory } from "../src/generated/prisma/client";
import { cloudinary } from "../src/lib/cloudinary";

const SYSTEM_VOICES_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "system-voices",
);

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
});

const env = envSchema.parse(process.env);

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

interface VoiceMetadata {
  description: string;
  category: VoiceCategory;
  language: string;
}

const systemVoiceMetadata: Record<string, VoiceMetadata> = {
  Aaron: {
    description: "Soothing and calm, like a self-help audiobook narrator",
    category: "AUDIOBOOK",
    language: "en-US",
  },
  Abigail: {
    description: "Friendly and conversational with a warm, approachable tone",
    category: "CONVERSATIONAL",
    language: "en-GB",
  },
  Anaya: {
    description: "Polite and professional, suited for customer service",
    category: "CUSTOMER_SERVICE",
    language: "en-IN",
  },
  Andy: {
    description: "Versatile and clear, a reliable all-purpose narrator",
    category: "GENERAL",
    language: "en-US",
  },
  Archer: {
    description: "Laid-back and reflective with a steady, storytelling pace",
    category: "NARRATIVE",
    language: "en-US",
  },
  Brian: {
    description: "Professional and helpful with a clear customer support tone",
    category: "CUSTOMER_SERVICE",
    language: "en-US",
  },
  Chloe: {
    description: "Bright and bubbly with a cheerful, outgoing personality",
    category: "CORPORATE",
    language: "en-AU",
  },
  Dylan: {
    description:
      "Thoughtful and intimate, like a quiet late-night conversation",
    category: "GENERAL",
    language: "en-US",
  },
  Emmanuel: {
    description: "Nasally and distinctive with a quirky, cartoon-like quality",
    category: "CHARACTERS",
    language: "en-US",
  },
  Ethan: {
    description: "Polished and warm with crisp, studio-quality delivery",
    category: "VOICEOVER",
    language: "en-US",
  },
  Evelyn: {
    description: "Warm Southern charm with a heartfelt, down-to-earth feel",
    category: "CONVERSATIONAL",
    language: "en-US",
  },
  Gavin: {
    description: "Calm and reassuring with a smooth, natural flow",
    category: "MEDITATION",
    language: "en-US",
  },
  Gordon: {
    description: "Warm and encouraging with an uplifting, motivational tone",
    category: "MOTIVATIONAL",
    language: "en-US",
  },
  Ivan: {
    description: "Deep and cinematic with a dramatic, movie-character presence",
    category: "CHARACTERS",
    language: "ru-RU",
  },
  Laura: {
    description: "Authentic and warm with a conversational Midwestern tone",
    category: "CONVERSATIONAL",
    language: "en-US",
  },
  Lucy: {
    description: "Direct and composed with a professional phone manner",
    category: "CUSTOMER_SERVICE",
    language: "en-US",
  },
  Madison: {
    description: "Energetic and unfiltered with a casual, chatty vibe",
    category: "PODCAST",
    language: "en-US",
  },
  Marisol: {
    description: "Confident and polished with a persuasive, ad-ready delivery",
    category: "ADVERTISING",
    language: "en-US",
  },
  Meera: {
    description: "Friendly and helpful with a clear, service-oriented tone",
    category: "CUSTOMER_SERVICE",
    language: "en-IN",
  },
  Walter: {
    description: "Old and raspy with deep gravitas, like a wise grandfather",
    category: "NARRATIVE",
    language: "en-US",
  },
};

async function readSystemVoiceAudio(name: string) {
  const filePath = path.join(SYSTEM_VOICES_DIR, `${name}.wav`);
  const buffer = Buffer.from(await fs.readFile(filePath));
  return { buffer, contentType: "audio/wav" };
}

export async function uploadSystemAudio({
  buffer,
  key,
  folder = "aether-voices",
}: {
  buffer: Buffer;
  key: string;
  folder?: string;
}) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",
        public_id: key,
        folder: folder,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
}

async function seedSystemVoices(name: string) {
  const { buffer, contentType } = await readSystemVoiceAudio(name);

  const existingSystemVoice = await prisma.voice.findFirst({
    where: {
      varient: "SYSTEM",
      name: name,
    },
    select: { id: true },
  });

  if (existingSystemVoice) {
    const objectKey = `voices/system/${existingSystemVoice.id}`;
    const meta = systemVoiceMetadata[name];

    await uploadSystemAudio({
      key: objectKey,
      buffer,
      folder: "aether-voices",
    });

    await prisma.voice.update({
      where: {
        id: existingSystemVoice.id,
      },
      data: {
        r2ObjectKey: objectKey,
        ...(meta && {
          description: meta.description,
          category: meta.category,
          language: meta.language,
        }),
      },
    });

    return;
  }

  const meta = systemVoiceMetadata[name];
  const voice = await prisma.voice.create({
    data: {
      name,
      varient: "SYSTEM",
      orgId: null,
      ...(meta && {
        description: meta.description,
        category: meta.category,
        language: meta.language,
      }),
    },
    select: { id: true },
  });

  const objectKey = `voices/system/${voice.id}`;

  try {
    await uploadSystemAudio({
      key: objectKey,
      buffer,
      folder: "aether-voices",
    });

    await prisma.voice.update({
      where: {
        id: voice.id,
      },
      data: {
        r2ObjectKey: objectKey,
      },
    });
  } catch (error) {
    await prisma.voice
      .delete({
        where: {
          id: voice.id,
        },
      })
      .catch(() => {});
  }
}

async function main() {
  console.log(
    `Seeding ${CANONICAL_SYSTEM_VOICE_NAMES.length} system voices...`,
  );

  for (const name of CANONICAL_SYSTEM_VOICE_NAMES) {
    console.log(`- ${name}`);
    await seedSystemVoices(name);
  }

  console.log("System voice seed completed.");
}

main()
  .catch((error) => {
    console.error("Failed to seed system voices:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
