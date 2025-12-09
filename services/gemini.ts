import { GoogleGenAI } from "@google/genai";

// Initialize the client
// The API key is guaranteed to be in process.env.API_KEY per the environment setup
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImageCaption = async (base64Image: string, mimeType: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Remove the data URL prefix if present (e.g., "data:image/png;base64,") to get raw base64
    const cleanBase64 = base64Image.split(',')[1];

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: cleanBase64
            }
          },
          {
            text: "Write a short, fun, and engaging social media caption for this photo. Include 2-3 relevant emojis. Keep it under 2 sentences."
          }
        ]
      }
    });

    return response.text || "Cool photo! 📸";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate caption");
  }
};
