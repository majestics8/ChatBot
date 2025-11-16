// import { streamText, createTextStreamResponse } from "ai";
// import { openai } from "@ai-sdk/openai";

// export const runtime = "edge";

// export async function POST(req) {
//   try {
//     const { message } = await req.json();

//     const result = await streamText({
//       model: openai("gpt-4o-mini"), // Free model via Vercel AI SDK
//       messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         { role: "user", content: message },
//       ],
//     });

//     // ✅ Updated for latest SDK version:
//     return createTextStreamResponse(result);
//   } catch (error) {
//     console.error("Chat API Error:", error);
//     return new Response("Error: " + error.message, { status: 500 });
//   }
// }



// app/api/chat/route.js
import { streamText, createTextStreamResponse } from "ai";
import { openai } from "@ai-sdk/openai";

export const runtime = "edge";

// Edit this knowledge base for your business (FAQs, policies, quick facts)
const KNOWLEDGE_BASE = `
You are Kuldeep Assistant — a helpful, polite customer support chatbot for Kuldeep AI Services.
Support hours: 9 AM - 6 PM (Mon-Sat).
FAQs:
- Refunds: 5-7 business days.
- Damaged product: free replacement within 30 days.
- Login issues: use password reset or contact support.
- Account deletion: user must verify email.
`;

export async function POST(req) {
  try {
    const payload = await req.json();
    const { message, history = [], tone = "friendly" } = payload ?? {};

    if (!message || message.trim().length === 0) {
      return new Response(JSON.stringify({ error: "No message provided" }), { status: 400 });
    }

    // Build conversation for model (system + history + latest user)
    const chatMessages = [
      {
        role: "system",
        content: `You are a customer-support assistant. Business: Kuldeep AI Services. Tone: ${tone}. ${KNOWLEDGE_BASE}`
      },
      // Accept history objects with { role: "user"|"assistant", content: "..." }
      ...history,
      { role: "user", content: message }
    ];

    // streamText returns a stream result that createTextStreamResponse accepts
    const result = await streamText({
      model: openai("gpt-4o-mini"),
      messages: chatMessages,
    });

    return createTextStreamResponse(result);
  } catch (err) {
    console.error("Chat API Error:", err);
    return new Response(JSON.stringify({ error: String(err?.message ?? err) }), { status: 500 });
  }
}
