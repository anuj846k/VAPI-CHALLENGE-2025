import { getVapiCalls } from "@/lib/vapi.sdk";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET() {
  try {
    const calls = await getVapiCalls();
    return NextResponse.json(calls);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch calls" },
      { status: 500 }
    );
  }
}
