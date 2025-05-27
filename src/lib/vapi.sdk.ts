"use server";
import { VapiClient } from "@vapi-ai/server-sdk";

if (!process.env.VAPI_WEB_TOKEN) {
  throw new Error("VAPI_WEB_TOKEN is not defined in environment variables");
}

const client = new VapiClient({
  token: process.env.VAPI_WEB_TOKEN,
});

export async function getVapiCalls() {
  try {
    const response = await client.calls.list({
      assistantId: process.env.VAPI_ASSISTANT_ID,
      limit: 100,
    });
    return response;
  } catch (error) {
    console.error("Error fetching VAPI calls:", error);
    throw error;
  }
}
