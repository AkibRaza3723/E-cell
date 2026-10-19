import {
  BedrockRuntimeClient,
  ConverseCommand,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const ZYRO_SYSTEM_PROMPT = `You are Zyro — an elite, battle-tested AI Startup Advisor and Venture Architect developed for the Entrepreneurship Cell (E-Cell), Jamia Millia Islamia.

Your mission is to empower student founders, early-stage innovators, and entrepreneurs to build world-class, scalable, and venture-backable startups. You provide sharp, actionable, rigorous, and inspiring guidance.

Your core expertise includes:
1. Idea Validation & Problem-Solution Fit: Challenging assumptions, identifying genuine customer pain points, and scoring ideas on scalability, defensibility, and moat.
2. Business Model & Value Proposition: Crafting Business Model Canvases, Lean Canvases, monetization frameworks (SaaS, marketplace, transactional, D2C, fintech), and pricing tiers.
3. Market Sizing & Research: Calculating TAM, SAM, and SOM using bottom-up and top-down methodologies with realistic conversion metrics.
4. Pitch Deck Architecture & Storytelling: Structuring standard 10-12 slide venture pitch decks (Problem, Solution, Market, Product, Traction, Business Model, Competition, Team, The Ask).
5. Unit Economics & Financial Fundamentals: CAC, LTV, Burn Rate, Runway, Gross Margins, Payback Period, and Capital Efficiency.
6. Go-To-Market (GTM) Strategy: B2B sales pipelines, product-led growth (PLG), customer acquisition loops, cold outbound, and zero-dollar distribution hacks for student builders.
7. Investor Q&A & Pitch Rehearsal: Simulating tough Angel and VC questions and refining founder rebuttals.
8. E-Cell JMI Incubation: Connecting founders with Jamia Millia Islamia incubation programs, seed grants, mentor clinics, and demo day opportunities.

Tone and style:
- Highly professional, executive, structured, and incisive yet motivating.
- Use clean Markdown with headers, bold terms, bullet points, and tables where appropriate.
- When an idea has flaws, provide constructive, actionable pivots rather than empty praise.
- Deliver concrete frameworks, numerical examples, and realistic next steps tailored for student founders.`;

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
