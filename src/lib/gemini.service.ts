import { GoogleGenerativeAI } from "@google/generative-ai";
import toast from "react-hot-toast";

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error(
    "NEXT_PUBLIC_GEMINI_API_KEY is not defined in environment variables"
  );
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export interface EmergencyAnalysis {
  severity: "critical" | "high" | "medium" | "low";
  category: string;
  location: string;
  locationCoordinates: { lat: number; lng: number };
  recommendedActions: string[];
  riskAssessment: string;
  callerEmotions: {
    fear: number;
    confusion: number;
    anxiety: number;
    urgency: number;
  };
}

export async function analyzeEmergency(callData: {
  summary: string;
  transcript: string;
  status: string;
}): Promise<EmergencyAnalysis> {
  console.log("Starting Gemini analysis for call:", callData.summary);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const prompt = `
      Analyze this emergency call data and provide a structured analysis.
      Return ONLY a valid JSON object without any markdown formatting or additional text.
      
      Input data:
      Summary: ${callData.summary}
      Transcript: ${callData.transcript}
      Status: ${callData.status}
      
      Required JSON structure:
      {
        "severity": "critical" | "high" | "medium" | "low",
        "category": "string describing the type of emergency",
        "location": "string — if a specific address or coordinates (lat/lng) are mentioned, return that. If not, return the most precise nearby known location or landmark mentioned.",
        "locationCoordinates": "string — If a specific address or latitude/longitude coordinates are mentioned, return them in the format {lat: number, lng: number}. If not, extract and return the coordinates of the most precise nearby known location or landmark mentioned. For example, if 'Boston' is mentioned, return its coordinates in latitude and longitude format. {lat: number, lng: number}"
        "recommendedActions": ["array", "of", "recommended", "actions"],
        "riskAssessment": "string describing the risk assessment",
        "callerEmotions": {
          "fear": number (0-100),
          "confusion": number (0-100),
          "anxiety": number (0-100),
          "urgency": number (0-100)
        }
      }
    `;

    console.log("Sending prompt to Gemini...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      const cleanedText = text
        .replace(/```json\s*/g, "")
        .replace(/```\s*$/g, "")
        .trim();

      console.log("Cleaned response:", cleanedText);
      const analysis = JSON.parse(cleanedText);
      console.log("Successfully parsed Gemini response:", analysis);
      return analysis as EmergencyAnalysis;
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      console.error("Failed text was:", text);
      throw new Error("Failed to parse Gemini response");
    }
  } catch (error) {
    console.error("Error in Gemini analysis:", error);

    if (error.message?.includes("429") || error.message?.includes("quota")) {
      toast.error(
        "Google API rate limited. Please wait a few minutes before trying again.",
        {
          duration: 5000,
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
          },
        }
      );
    }

    throw error;
  }
}
