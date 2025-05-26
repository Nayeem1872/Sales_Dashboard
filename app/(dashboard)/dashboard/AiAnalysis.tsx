"use client"; // If you're using Next.js App Router and this is a client component

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

// Sample data - in a real app, this might come from props or a global store/context
const salesData = [
  { name: "Jan", sales: 4000, target: 2400 },
  { name: "Feb", sales: 3000, target: 2500 },
  { name: "Mar", sales: 5000, target: 2600 },
  { name: "Apr", sales: 2780, target: 2700 },
  { name: "May", sales: 1890, target: 2800 },
  { name: "Jun", sales: 2390, target: 2900 },
  { name: "Jul", sales: 3490, target: 3000 },
];
const customerData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    amount: 1200,
    date: "2023-05-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    amount: 850,
    date: "2023-05-14",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert@example.com",
    amount: 2300,
    date: "2023-05-13",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    amount: 750,
    date: "2023-05-12",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael@example.com",
    amount: 1600,
    date: "2023-05-11",
  },
  {
    id: 6,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    amount: 920,
    date: "2023-05-10",
  },
  {
    id: 7,
    name: "David Taylor",
    email: "david@example.com",
    amount: 3100,
    date: "2023-05-09",
  },
  {
    id: 8,
    name: "Lisa Anderson",
    email: "lisa@example.com",
    amount: 1450,
    date: "2023-05-08",
  },
  {
    id: 9,
    name: "James Martinez",
    email: "james@example.com",
    amount: 680,
    date: "2023-05-07",
  },
  {
    id: 10,
    name: "Jennifer Robinson",
    email: "jennifer@example.com",
    amount: 2100,
    date: "2023-05-06",
  },
];

// --- Helper Functions for AI ---

// Helper function to summarize sales data
const summarizeSalesDataForAI = (data: typeof salesData) => {
  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const totalTarget = data.reduce((sum, item) => sum + item.target, 0);
  const numMonths = data.length;
  const latestMonth = data[numMonths - 1];

  return `
Monthly Sales Data Summary (${numMonths} months):
- Total Sales: $${totalSales.toLocaleString()}
- Total Target: $${totalTarget.toLocaleString()}
- Latest Month (${
    latestMonth.name
  }): Sales $${latestMonth.sales.toLocaleString()}, Target $${latestMonth.target.toLocaleString()}
Sales by month: ${data.map((d) => `${d.name}: $${d.sales}`).join(", ")}
  `.trim();
};

// Helper function to summarize customer data
const summarizeCustomerDataForAI = (data: typeof customerData) => {
  const totalCustomers = data.length;
  const totalSpending = data.reduce((sum, cust) => sum + cust.amount, 0);
  const averageSpending =
    totalCustomers > 0 ? totalSpending / totalCustomers : 0;

  return `
Customer Data Summary:
- Total Customers: ${totalCustomers}
- Total Spending by these customers: $${totalSpending.toLocaleString()}
- Average Spending per customer: $${averageSpending.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
Recent purchases include amounts like: ${data
    .slice(0, 5)
    .map((c) => `$${c.amount}`)
    .join(", ")}
  `.trim();
};

async function getAiAnalysisFromAPI(promptType: string, dataSummary: string) {
  let userInputPrompt = "";
  // All our combined prompts will expect JSON
  const expectJson = true;

  switch (promptType) {
    case "combinedSalesAnalysis":
      userInputPrompt = `
        Based on the provided sales data summary, perform a comprehensive analysis.
        Respond ONLY with a valid JSON object containing the following keys:
        1. "performance": An object with "status" (string, e.g., "Good", "Moderate", "Bad") and "explanation" (string).
        2. "recommendations": An array of 2-3 string recommendations.
        3. "forecast": A number representing the sales forecast for the next period.
        4. "alerts": An array of alert objects (each with "type" (string) and "message" (string)). If no alerts, this should be an empty array.
  
        Example:
        {
          "performance": {"status": "Good", "explanation": "Sales are exceeding targets."},
          "recommendations": ["Increase marketing for Product X", "Offer a discount on Product Y"],
          "forecast": 4590,
          "alerts": []
        }`;
      break;

    case "combinedCustomerAnalysis":
      userInputPrompt = `
        Based on the provided customer data summary, perform a comprehensive analysis.
        Respond ONLY with a valid JSON object containing the following keys:
        1. "insights": An object with "averageSpending" (number), "highValueCustomersCount" (number), and "lowValueCustomersCount" (number).
        2. "recommendations": An array of 1-2 string recommendations for customer engagement.
  
        Example:
        {
          "insights": {"averageSpending": 1500.75, "highValueCustomersCount": 3, "lowValueCustomersCount": 2},
          "recommendations": ["Launch loyalty program", "Targeted email campaign for low spenders"]
        }`;
      break;

    default:
      console.warn("Unknown AI prompt type for combined analysis:", promptType);
      throw new Error(`Unsupported combined prompt type: ${promptType}`);
  }

  // ... (rest of your fetch logic remains the same) ...
  // The JSON parsing logic should also remain the same as it's designed to handle any valid JSON.
  try {
    const response = await fetch("/api/askGemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userInput: userInputPrompt,
        dashboardDataSummary: dataSummary,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.details || result.error || "API request failed");
    }

    if (expectJson) {
      try {
        const jsonMatch = result.answer.match(/```json\s*([\s\S]*?)\s*```/);
        let jsonData;
        if (jsonMatch && jsonMatch[1]) {
          jsonData = JSON.parse(jsonMatch[1]);
        } else {
          jsonData = JSON.parse(result.answer);
        }
        return jsonData;
      } catch (e) {
        console.error(
          "Failed to parse JSON from Gemini for",
          promptType,
          ":",
          result.answer,
          e
        );
        throw new Error(
          `AI returned non-JSON response for ${promptType} when JSON was expected. Response: ${result.answer.substring(
            0,
            100
          )}...`
        );
      }
    }
    return result.answer;
  } catch (error) {
    console.error(`Error fetching AI analysis for ${promptType}:`, error);
    throw error;
  }
}
const AiAnalysisComponent = () => {
  // States for AI-derived data
  const [salesAnalysis, setSalesAnalysis] = useState<{
    status: string;
    explanation: string;
  } | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [forecast, setForecast] = useState<number | null>(null);
  const [alerts, setAlerts] = useState<{ type: string; message: string }[]>([]);
  const [customerInsights, setCustomerInsights] = useState<{
    averageSpending: number;
    highValueCustomersCount: number;
    lowValueCustomersCount: number;
  } | null>(null);
  const [customerRecommendations, setCustomerRecommendations] = useState<
    string[]
  >([]);

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // In AiAnalysisComponent.tsx

  useEffect(() => {
    const fetchAllAiData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const salesSummary = summarizeSalesDataForAI(salesData);
        const customerSummary = summarizeCustomerDataForAI(customerData);

        // Make two combined API calls
        const [salesAiData, customerAiData] = await Promise.all([
          getAiAnalysisFromAPI("combinedSalesAnalysis", salesSummary),
          getAiAnalysisFromAPI("combinedCustomerAnalysis", customerSummary),
        ]);

        // Set states with data from the combined API responses
        if (salesAiData) {
          setSalesAnalysis(salesAiData.performance || null);
          setRecommendations(salesAiData.recommendations || []);
          setForecast(
            salesAiData.forecast !== undefined ? salesAiData.forecast : null
          );
          setAlerts(salesAiData.alerts || []);
        } else {
          // Handle case where salesAiData might be unexpectedly null/undefined
          console.warn("Sales AI data is missing");
          setSalesAnalysis(null);
          setRecommendations([]);
          setForecast(null);
          setAlerts([]);
        }

        if (customerAiData) {
          setCustomerInsights(customerAiData.insights || null);
          setCustomerRecommendations(customerAiData.recommendations || []);
        } else {
          // Handle case where customerAiData might be unexpectedly null/undefined
          console.warn("Customer AI data is missing");
          setCustomerInsights(null);
          setCustomerRecommendations([]);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred while fetching AI analysis.");
        }
        console.error("Error in AiAnalysisComponent useEffect:", err);
        setSalesAnalysis(null);
        setRecommendations([]);
        setForecast(null);
        setAlerts([]);
        setCustomerInsights(null);
        setCustomerRecommendations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllAiData();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading AI insights...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Analysis Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {" "}
      {/* Added a wrapping div with spacing */}
      {/* AI Analysis Section */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Sales Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Sales Performance</h3>
            <p>
              <strong>Status:</strong> {salesAnalysis?.status || "N/A"}
            </p>
            <p>
              <strong>Explanation:</strong>{" "}
              {salesAnalysis?.explanation || "No explanation available."}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              Trend Analysis and Forecasting
            </h3>
            <p>
              Based on AI analysis, we forecast sales of{" "}
              <strong>
                {forecast !== null ? forecast.toLocaleString() : "N/A"}
              </strong>{" "}
              next month.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Smart Recommendations</h3>
            {recommendations.length > 0 ? (
              <ul>
                {recommendations.map((recommendation, index) => (
                  <li key={index}>- {recommendation}</li>
                ))}
              </ul>
            ) : (
              <p>No recommendations available.</p>
            )}
          </div>
        </CardContent>
      </Card>
      {/* AI Alerts Section */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500 inline-block" />{" "}
              AI-Generated Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {alerts.map((alert, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span>
                    <strong>{alert.type}:</strong> {alert.message}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      {/* AI-Powered Customer Insights and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Customer Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">
              Customer Behavior Analysis
            </h3>
            <p>
              <strong>Average Spending:</strong> $
              {customerInsights?.averageSpending?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || "N/A"}
            </p>
            <p>
              <strong>High-Value Customers:</strong>{" "}
              {customerInsights?.highValueCustomersCount ?? "N/A"}
            </p>
            <p>
              <strong>Low-Value Customers:</strong>{" "}
              {customerInsights?.lowValueCustomersCount ?? "N/A"}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Customer Recommendations</h3>
            {customerRecommendations.length > 0 ? (
              <ul>
                {customerRecommendations.map((recommendation, index) => (
                  <li key={index}>- {recommendation}</li>
                ))}
              </ul>
            ) : (
              <p>No customer recommendations available.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AiAnalysisComponent; // Renamed to avoid conflict if you have another `AiAnalysis`
