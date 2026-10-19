import { NextResponse } from "next/server";
import {
  generateZyroReply,
  isBedrockConfigured,
  getBedrockModelId,
  getBedrockRegion,
  ChatMessage,
} from "@/lib/bedrock";

export async function GET() {
  return NextResponse.json({
    configured: isBedrockConfigured(),
    model: getBedrockModelId(),
    region: getBedrockRegion(),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body?.messages as ChatMessage[];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { success: false, error: "Messages array is required." },
        { status: 400 }
      );
    }

    // Clean and validate messages
    const validMessages: ChatMessage[] = messages
      .filter((m) => m && typeof m.content === "string" && m.content.trim())
      .map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content.trim(),
      }));

    if (validMessages.length === 0) {
      return NextResponse.json(
        { success: false, error: "No valid messages found." },
        { status: 400 }
      );
    }

    const result = await generateZyroReply(validMessages);

    return NextResponse.json({
      success: true,
      text: result.text,
      model: result.model,
    });
  } catch (error: any) {
    console.error("Zyro API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to generate AI response from Amazon Bedrock.",
      },
      { status: 500 }
    );
  }
}
