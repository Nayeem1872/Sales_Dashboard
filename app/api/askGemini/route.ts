// File: app/api/askGemini/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Check if the API key is loaded AT THE VERY START
if (!process.env.GEMINI_API_KEY) {
  console.error("FATAL: GEMINI_API_KEY is not defined in the environment!");
  // In a real app, you might want to prevent the app from even starting or handle this more gracefully.
  // For now, the constructor below will likely fail, and the error will be caught.
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// Named export for the POST method
export async function POST(req: NextRequest) {
  console.log("[API /api/askGemini] Received POST request.");

  try {
    // For App Router, you await req.json() to get the body
    const body = await req.json();
    const { userInput, dashboardDataSummary } = body;

    if (!userInput) {
      console.log("[API /api/askGemini] User input missing.");
      return NextResponse.json(
        { error: "User input is required" },
        { status: 400 }
      );
    }

    console.log("[API /api/askGemini] User input:", userInput);
    console.log(
      "[API /api/askGemini] Dashboard summary:",
      dashboardDataSummary
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    let prompt = `You are a helpful AI assistant analyzing a sales dashboard.
    Here is a summary of the current dashboard data:
    ---
    ${
      dashboardDataSummary ||
      "No specific dashboard data provided for this query."
    }
    ---

    The user's question or request is: "${userInput}"

    Based on all the above, please provide an insightful answer, suggestion, or prediction.
    If the question is about "what to do next", provide actionable recommendations.
    If the question is about "what will happen if", provide a likely scenario based on the data.
    Be concise and clear.`;

    if (
      userInput.toLowerCase().includes("what to do next") ||
      userInput.toLowerCase().includes("recommend")
    ) {
      prompt += `\n\nConsider the following when making recommendations:
      - Current sales trends (up, down, flat).
      - Top performing products/services.
      - Underperforming products/services.
      - Potential market opportunities or threats (if any data is available).
      Focus on 2-3 actionable steps.`;
    }

    if (
      userInput.toLowerCase().includes("what will happen if") ||
      userInput.toLowerCase().includes("predict")
    ) {
      prompt += `\n\nWhen making predictions, consider:
      - Historical data patterns (if known or implied by the summary).
      - Common business impacts of the proposed action.
      - State any assumptions you are making.`;
    }

    console.log(
      "[API /api/askGemini] Sending prompt to Gemini:",
      prompt.substring(0, 200) + "..."
    );

    const result = await model.generateContent(prompt);
    const geminiResponse = await result.response; // Note: Renamed from 'response' to avoid conflict
    const text = geminiResponse.text();

    console.log("[API /api/askGemini] Received response from Gemini.");
    return NextResponse.json({ answer: text }, { status: 200 });
  } catch (error: any) {
    // Catching 'any' or 'unknown' and then checking type is safer
    console.error("[API /api/askGemini] Error caught:", error);
    let errorMessage = "Failed to get response from AI";
    let errorDetails = {};

    if (error instanceof Error) {
      errorMessage = error.message; // Use the actual error message if available
      errorDetails = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      }; // Include more details for debugging
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    // Check if the error is from the Gemini API specifically (you might need to inspect the error structure)
    // For example, if Gemini errors have a specific structure, you can parse it here.
    // Example: if (error.response && error.response.data) { details = error.response.data; }

    return NextResponse.json(
      {
        error: "Failed to process request with AI", // A generic error message for the client
        details: errorMessage, // More specific details for debugging, or can be a more structured object
      },
      { status: 500 }
    );
  }
}

// If you need to handle other methods like GET for testing:
// export async function GET(req: NextRequest) {
//   return NextResponse.json({ message: "Hello from GET /api/askGemini" });
// }
