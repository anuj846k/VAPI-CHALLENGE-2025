"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CallsList() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  useEffect(() => {
    async function fetchCalls() {
      try {
        const response = await fetch("/api/calls");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched calls:", data);
        setCalls(data);
      } catch (error) {
        console.error("Error fetching calls:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCalls();
  }, []);

  if (loading)
    return <div className="p-8 text-center">Loading VAPI calls...</div>;
  if (error)
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  if (calls.length === 0)
    return <div className="p-8 text-center">No calls found</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">VAPI Call Transcripts</h1>
      <div className="space-y-8">
        {calls.map((call) => (
          <div key={call} className="p-4 border rounded shadow">
            <div className="text-black">Call Id: {call.id}</div>
            {/* <div className="text-black">{call.transcript}</div> */}
            <div className="text-black">
              <h1 className="text-xl font-bold">Summary of the call </h1>
              {call.summary}
            </div>

            <div className="text-black">
              <h1 className="text-xl font-bold">Transcript of the call </h1>
              {call.transcript}
            </div>
            <div className="text-black">
              <h1 className="text-xl font-bold">Analysis </h1>
              {call.analysis?.successEvaluation} {call.analysis?.summary}
            </div>

            <div className="text-black">
              <h1 className="text-xl font-bold">Analysis </h1>
              {formatTime(call.analysis?.startedAt) }
            </div>

            <div className="text-black">
              <h1 className="text-xl font-bold">Recording of the call </h1>
              <Link
                href={call.recordingUrl || ""}
                target="_blank"
                className="hover:text-blue-500 hover:underline"
              >
                {call.recordingUrl}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
