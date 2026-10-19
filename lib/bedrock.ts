import {
  BedrockRuntimeClient,
  ConverseCommand,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

import { ZYRO_SYSTEM_PROMPT } from "@/lib/zyro-prompt";
export { ZYRO_SYSTEM_PROMPT };

export function isBedrockConfigured(): boolean {
  return Boolean(
    process.env.AWS_ACCESS_KEY_ID?.trim() &&
    process.env.AWS_SECRET_ACCESS_KEY?.trim()
  );
}

export function getBedrockModelId(): string {
  return (
    process.env.AWS_BEDROCK_MODEL_ID?.trim() ||
    "anthropic.claude-3-5-sonnet-20240620-v1:0"
  );
}

export function getBedrockRegion(): string {
  return process.env.AWS_REGION?.trim() || "us-east-1";
}

let cachedClient: BedrockRuntimeClient | null = null;

function getClient(): BedrockRuntimeClient | null {
  if (!isBedrockConfigured()) return null;

  if (!cachedClient) {
    cachedClient = new BedrockRuntimeClient({
      region: getBedrockRegion(),
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!.trim(),
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!.trim(),
      },
    });
  }
  return cachedClient;
}

/**
 * Production-ready inference handler via Amazon Bedrock.
 */
export async function generateZyroReply(
  messages: ChatMessage[]
): Promise<{ text: string; model: string }> {
  const modelId = getBedrockModelId();

  if (!isBedrockConfigured()) {
    throw new Error(
      "AWS Bedrock credentials are not configured. Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in the environment."
    );
  }

  const client = getClient();
  if (!client) {
    throw new Error("Unable to initialize Amazon Bedrock client.");
  }

  // Format messages for Bedrock Converse API
  const formattedMessages = messages.map((m) => ({
    role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
    content: [{ text: m.content }],
  }));

  try {
    // 1. Primary: Unified Bedrock Converse API
    const converseCmd = new ConverseCommand({
      modelId,
      system: [{ text: ZYRO_SYSTEM_PROMPT }],
      messages: formattedMessages,
      inferenceConfig: {
        maxTokens: 3000,
        temperature: 0.7,
      },
    });

    const response = await client.send(converseCmd);
    const replyText = response.output?.message?.content?.[0]?.text;

    if (replyText) {
      return {
        text: replyText,
        model: modelId,
      };
    }
  } catch (converseErr: any) {
    console.warn("Bedrock Converse API failed, trying Anthropic InvokeModel fallback:", converseErr?.message);

    // 2. Fallback: Anthropic Messages InvokeModel API
    try {
      const claudePayload = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 3000,
        temperature: 0.7,
        system: ZYRO_SYSTEM_PROMPT,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      };

      const invokeCmd = new InvokeModelCommand({
        modelId,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify(claudePayload),
      });

      const invokeRes = await client.send(invokeCmd);
      const decoded = JSON.parse(new TextDecoder().decode(invokeRes.body));
      const text = decoded?.content?.[0]?.text;

      if (text) {
        return {
          text,
          model: modelId,
        };
      }
    } catch (invokeErr: any) {
      console.error("Bedrock InvokeModel fallback error:", invokeErr);
      throw new Error(
        invokeErr?.message || converseErr?.message || "Amazon Bedrock request failed."
      );
    }
  }

  throw new Error("Empty response received from Amazon Bedrock.");
}
