// src/components/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyC0ZpzK0O4VuhzWO-noM3_XKMpw0BDLzCM";

const genAI = new GoogleGenerativeAI(apiKey);

export async function askGemini(userPrompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const today = new Date().toISOString().split("T")[0];

  const systemInstruction = `
  Today's date is ${today}.
  You are a task extraction AI. 
  From the user's message, extract tasks into JSON like this:

  {
    "tasks": [
      { "task": "task description", "priority": "low|medium|high", "date": "YYYY-MM-DD or null" }
    ]
  }

You are a task extraction AI. 
From the user's message, extract tasks into JSON like this:

{
  "tasks": [
    { "task": "task description", "priority": "low|medium|high", "date": "YYYY-MM-DD or null" }
  ]
}

Rules:
- Always output valid JSON, nothing else.
- Only include tasks if the user clearly mentioned one.
- For "priority":
   - If user says "important", "urgent", "must", → "high".
   - If user says "maybe", "later" → "low".
   - Otherwise → "medium".
- For "date":
   - Detect relative terms: 
     - "today", "tonight" → today's date.
     - "tomorrow" → today's date + 1 day.
     - "next week" → 8 days from today.
     - "next month" → same day next month.
     - Explicit mentions (e.g., "on Sept 10") → parse into ISO format.
   - If no date is specified → null.
- Never invent a date if not mentioned.
`;

  try {
    const prompt = `${systemInstruction}\n\nUser: ${userPrompt}`;
    const result = await model.generateContent(prompt, {
      temperature: 0.2,
      maxOutputTokens: 512,
    });

    const text = result?.response?.text?.() ?? "";

    // Try parse raw JSON
    try {
      const parsed = JSON.parse(text);
      return parsed;
    } catch (e) {
      // Try to extract the first {...} substring (useful if model added commentary)
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          return JSON.parse(match[0]);
        } catch (_) {
          // fall through
        }
      }
      // return structured error object (do NOT throw)
      return { error: "invalid_json", raw: text };
    }
  } catch (err) {
    // network / auth / API errors — return error object to the caller for graceful handling
    console.error("askGemini error:", err);
    return { error: "request_failed", message: err?.message || String(err) };
  }
}
