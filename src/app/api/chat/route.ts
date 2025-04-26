import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextRequest } from "next/server";

export const runtime = "edge"; // اختیاری اما برای استریم بهتر
export const maxDuration = 30; // حداکثر زمان استریم

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  // streamText بدون await هم جواب می‌ده
  const result = streamText({
    model: openai("gpt-4o"), // یا 'gpt-3.5-turbo'
    messages,
  });

  // همین متد داخلی، response استریم‌شده رو می‌سازه
  return result.toDataStreamResponse();
}
// app/api/chat/route.ts
