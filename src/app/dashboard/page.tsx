"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/DashboardCompo/Header";
import Sidebar from "@/components/DashboardCompo/Sidebar";
import MapSection from "@/components/DashboardCompo/Map";
import TranscriptSection from "@/components/DashboardCompo/TranscriptSection";
import { analyzeEmergency, EmergencyAnalysis } from "@/lib/gemini.service";
import { Loader2 } from "lucide-react";
import Dispatch from "@/components/DashboardCompo/Dispatch";

const LoadingState = ({
  message,
  progress,
}: {
  message: string;
  progress?: number;
}) => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="animate-spin  h-12 w-12 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">{message}</h2>

          {progress !== undefined && (
            <div className="w-full">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
                {progress}% Complete
              </p>
            </div>
          )}

          <p className="text-sm text-gray-500 text-center">
            This process uses AI to analyze emergency calls and may take a few
            moments. Please wait while we process your data.
          </p>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [calls, setCalls] = useState([]);
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCallId, setSelectedCallId] = useState(null);
  const [error, setError] = useState(null);
  const [analyzedCalls, setAnalyzedCalls] = useState<
    Record<string, EmergencyAnalysis>
  >({});
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Loading calls...");

  useEffect(() => {
    async function fetchCalls() {
      try {
        setLoadingMessage("Fetching emergency calls...");
        console.log("Fetching calls...");
        const response = await fetch("/api/calls");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched calls:", data);
        setCalls(data);

        setAnalysisLoading(true);
        setLoadingMessage("Analyzing emergency calls with AI...");
        console.log("Starting Gemini analysis...");

        const batchSize = 3;
        const delay = (ms: number) =>
          new Promise((resolve) => setTimeout(resolve, ms));
        const totalBatches = Math.ceil(data.length / batchSize);

        for (let i = 0; i < data.length; i += batchSize) {
          const batch = data.slice(i, i + batchSize);
          const currentBatch = Math.floor(i / batchSize) + 1;
          const progress = Math.round((currentBatch / totalBatches) * 100);

          setLoadingMessage(
            `Analyzing batch ${currentBatch} of ${totalBatches}...`
          );
          setLoadingProgress(progress);

          console.log(`Processing batch ${currentBatch} of ${totalBatches}...`);

          const analysisPromises = batch.map(async (call) => {
            try {
              console.log(`Analyzing call ${call.id}...`);
              const analysis = await analyzeEmergency({
                summary: call.summary,
                transcript: call.transcript || "",
                status: call.status,
              });
              console.log(`Analysis complete for call ${call.id}:`, analysis);
              return [call.id, analysis];
            } catch (error) {
              console.error(`Error analyzing call ${call.id}:`, error);
              return [call.id, null];
            }
          });

          const analyses = await Promise.all(analysisPromises);
          const validAnalyses = analyses.filter(
            ([analysis]) => analysis !== null
          );

          setAnalyzedCalls((prev) => ({
            ...prev,
            ...Object.fromEntries(validAnalyses),
          }));

          if (i + batchSize < data.length) {
            setLoadingMessage("Preparing next batch...");
            console.log("Waiting 2 seconds before processing next batch...");
            await delay(2000);
          }
        }

        if (data && data.length > 0) {
          setSelectedCallId(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching calls:", error);
        setError(error.message);
      } finally {
        setLoading(false);
        setAnalysisLoading(false);
        setLoadingProgress(0);
      }
    }

    fetchCalls();
  }, []);

  const handleCallSelect = (callId) => {
    setSelectedCallId(callId);
  };

  if (loading) {
    return <LoadingState message={loadingMessage} progress={loadingProgress} />;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar
          calls={calls}
          selectedCallId={selectedCallId}
          onCallSelect={handleCallSelect}
          analyzedCalls={analyzedCalls}
        />

        <main className="ml-[20%] w-full mt-16 p-0">
          <div className="flex flex-col gap-4 ">
            <div className="pr-20">
              <MapSection
                locationCoordinates={
                  analyzedCalls[selectedCallId]?.locationCoordinates
                }
              />
            </div>
            <Dispatch isMinimized={isPanelMinimized} />
            <TranscriptSection
              calls={calls}
              selectedCallId={selectedCallId}
              analyzedCalls={analyzedCalls}
              isMinimized={isPanelMinimized}
              setIsMinimized={setIsPanelMinimized}
            />
          </div>
        </main>
      </div>

      {analysisLoading && (
        <div className="fixed bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg">
          Analyzing calls with AI...
        </div>
      )}
    </div>
  );
};

export default Dashboard;
