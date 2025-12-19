
import { GoogleGenAI, Type } from "@google/genai";
import { PredictionResult, Parcel, RiskLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Uses Gemini 3 Pro with Thinking Mode for deep analysis of logistics data.
 */
export const getAdvancedPredictiveInsights = async (parcel: Parcel): Promise<PredictionResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `
      As an expert Indian logistics analyst for India Post, analyze this parcel's journey.
      
      Tracking ID: ${parcel.trackingId}
      From: ${parcel.origin}
      To: ${parcel.destination}
      Current Location: ${parcel.currentLocation}
      Status: ${parcel.status}
      
      Thinking about:
      1. Potential regional disruptions (strikes, weather, festivals).
      2. Infrastructure bottlenecks between ${parcel.currentLocation} and ${parcel.destination}.
      3. Historical delay patterns for this route.

      Return a JSON response precisely matching the schema.
    `,
    config: {
      thinkingConfig: { thinkingBudget: 32768 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          estimatedArrival: { type: Type.STRING },
          delayProbability: { type: Type.NUMBER },
          riskLevel: { type: Type.STRING, enum: Object.values(RiskLevel) },
          reasoning: { type: Type.STRING },
          externalFactors: {
            type: Type.OBJECT,
            properties: {
              weather: { type: Type.STRING },
              traffic: { type: Type.STRING },
              logistics: { type: Type.STRING }
            },
            required: ["weather", "traffic", "logistics"]
          },
          recommendation: { type: Type.STRING }
        },
        required: ["estimatedArrival", "delayProbability", "riskLevel", "reasoning", "externalFactors", "recommendation"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Analysis failed");
  return JSON.parse(text) as PredictionResult;
};

/**
 * Uses Gemini 2.5 Flash with Google Maps to find specific location data.
 */
export const getMapsContext = async (location: string, destination: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite-latest',
    contents: `Find real-time traffic and route status between ${location} and ${destination} in India.`,
    config: {
      tools: [{ googleMaps: {} }]
    }
  });
  
  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return {
    text: response.text,
    links: chunks.map(c => c.maps?.uri).filter(Boolean) as string[]
  };
};

/**
 * Uses Gemini 3 Flash with Google Search for real-time event grounding.
 */
export const getSearchGrounding = async (query: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Is there any major weather, strike, or logistics news affecting ${query} today?`,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });

  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return {
    text: response.text,
    links: chunks.map(c => c.web?.uri).filter(Boolean) as string[]
  };
};
