"use client"; // Keep this if you intend to use this in Next.js App Router
import Head from "next/head";
import { useState } from "react";

export default function HomePage() {
  const [userInput, setUserInput] = useState("");
  const [dashboardSummary, setDashboardSummary] = useState(
    "Last 7 days: Total Sales: $12,500. Top Product: 'Super Widget' (350 units). Sales Trend: Up 15% WoW. Low Performing: 'Basic Gadget' (20 units). Marketing Spend: $800 this week."
  );
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Error state should always hold a string

  // For TypeScript, it's good practice to type the event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim()) {
      setError("Please enter your question.");
      return;
    }
    setIsLoading(true);
    setError("");
    setAiResponse("");

    try {
      const response = await fetch("/api/askGemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput: userInput,
          dashboardDataSummary: dashboardSummary,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // data.error should be a string from your API.
        // The fallback is also a string. So new Error() gets a string message.
        throw new Error(
          data.error || `API request failed with status ${response.status}`
        );
      }

      setAiResponse(data.answer);
    } catch (err) {
      // err here will be an Error object from the throw above
      console.error("Frontend error:", err);
      if (err instanceof Error) {
        setError(err.message); // Set the error message string to state
      } else {
        // This is a fallback, less likely to be hit if 'throw new Error' is used
        setError(
          String(err) || "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of your component remains the same
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <Head>
        <title>Dashboard AI Assistant</title>
      </Head>

      <h1>Dashboard AI Assistant (with Gemini)</h1>

      <div>
        <h2>Current Dashboard Summary (Context for AI):</h2>
        <textarea
          value={dashboardSummary}
          onChange={(e) => setDashboardSummary(e.target.value)}
          rows={5}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          placeholder="Enter a summary of your dashboard data here..."
        />
        <p style={{ fontSize: "0.8em", color: "#555" }}>
          <em>
            (In a real app, this data would be dynamically fetched and
            summarized from your actual dashboard sources before being sent to
            the AI, or the API route itself would fetch it.)
          </em>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask about your dashboard... e.g., 'How are my sales?' or 'What should I do to improve sales of Basic Gadget?' or 'What will happen if I double marketing spend?'"
          rows={3}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "10px 20px",
            backgroundColor: isLoading ? "#ccc" : "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Thinking..." : "Ask AI"}
        </button>
      </form>

      {error && (
        <div
          style={{
            color: "red",
            marginTop: "15px",
            border: "1px solid red",
            padding: "10px",
          }}
        >
          <strong>Error:</strong> {error}{" "}
          {/* Now 'error' is guaranteed to be a string */}
        </div>
      )}

      {aiResponse && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #eee",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2>AI Response:</h2>
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {aiResponse}
          </pre>
        </div>
      )}
    </div>
  );
}
