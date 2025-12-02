import { GoogleGenAI, Chat } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to check if key is valid (simple check)
export const hasApiKey = () => !!apiKey;

export const createTravelChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are Voyageur, an elite AI travel concierge embedded in a luxury travel app. 
      Your goal is to help users plan trips, understand local culture, and find hidden gems near the properties they are viewing.
      Keep responses concise, helpful, and charming. Use emojis sparingly.
      If asked about specific real-time events, use your general knowledge to suggest types of activities typically available.`,
    },
  });
};

export const generatePropertyDescription = async (propertyTitle: string, location: string, amenities: string[]): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a compelling, luxurious, and inviting 150-word description for a vacation rental property titled "${propertyTitle}" located in "${location}". 
      Highlight these amenities: ${amenities.join(', ')}. 
      Focus on the experience, atmosphere, and "couleur locale". Do not use markdown headers.`,
    });
    return response.text || "Experience the ultimate getaway in this stunning property.";
  } catch (error) {
    console.error("Failed to generate description:", error);
    return "A beautiful property waiting for your arrival. (AI description unavailable)";
  }
};

export const suggestItinerary = async (location: string, days: number): Promise<string> => {
   try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create a brief ${days}-day itinerary for a trip to ${location}. Format it as a simple list with bold days. Keep it under 200 words.`,
    });
    return response.text || "Explore the local area and enjoy the scenery!";
  } catch (error) {
    return "Enjoy your stay in " + location;
  }
}
