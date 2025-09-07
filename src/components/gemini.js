import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = "AIzaSyC0ZpzK0O4VuhzWO-noM3_XKMpw0BDLzCM";



const genAI = new GoogleGenerativeAI(apiKey);

export async function askGemini(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  return result.response.text();
}
