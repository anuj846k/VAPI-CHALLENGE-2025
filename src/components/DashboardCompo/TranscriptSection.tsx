"use client";
import {
  BotMessageSquare,
  Minimize2,
  Maximize2,
  Phone,
  Headset,
  ArrowLeftRight,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { EmergencyAnalysis } from "@/lib/gemini.service";

interface Message {
  role: string;
  message: string;
  time: number;
  secondsFromStart: number;
}

interface Call {
  id: string;
  summary: string;
  transcript: string;
  startedAt: string;
  endedAt: string;
  status: string;
  customer: {
    number: string;
  };
  messages: Message[];
  recordingUrl: string;
  artifact?: {
    recordingUrl?: string;
    recording?: {
      mono?: {
        combinedUrl?: string;
      };
    };
  };
  analysis?: {
    summary: string;
    successEvaluation: string;
  };
}

interface TranscriptSectionProps {
  calls?: Call[];
  selectedCallId?: string;
  analyzedCalls?: Record<string, EmergencyAnalysis>;
  isMinimized: boolean;
  setIsMinimized: (isMinimized: boolean) => void;
}

const TranscriptSection: React.FC<TranscriptSectionProps> = ({
  calls = [],
  selectedCallId,
  analyzedCalls,
  isMinimized,
  setIsMinimized,
}) => {
  // const [isMinimized, setIsMinimized] = useState(false);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [transferToHumanOperator, setTransferToHumanOperator] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);

  useEffect(() => {
    if (calls.length > 0) {
      if (selectedCallId) {
        const call = calls.find((c) => c.id === selectedCallId);
        if (call) {
          setSelectedCall(call);
          console.log("Selected call:", call);

          return;
        }
      }

      const sortedCalls = [...calls].sort(
        (a, b) =>
          new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
      );
      setSelectedCall(sortedCalls[0]);
    }
  }, [calls, selectedCallId]);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const extractLocation = (summary: string): string => {
    if (!summary) return "Unknown location";

    const locationPatterns = [
      /in ([A-Za-z\s]+)/,
      /at ([A-Za-z\s]+)/,
      /near ([A-Za-z\s]+)/,
    ];

    for (const pattern of locationPatterns) {
      const match = summary.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    return "Unknown location";
  };

  const getEmergencyType = (summary: string): string => {
    if (!summary) return "Emergency";

    const emergencyTypes = [
      "fire",
      "earthquake",
      "flood",
      "hurricane",
      "medical",
      "ambulance",
      "injury",
      "accident",
      "food",
    ];

    for (const type of emergencyTypes) {
      if (summary.toLowerCase().includes(type)) {
        return type.charAt(0).toUpperCase() + type.slice(1);
      }
    }

    return "Emergency";
  };

  const parseTranscriptMessages = (call: Call) => {
    if (!call?.messages) return [];

    return call.messages
      .filter((msg) => msg.role === "user" || msg.role === "bot")
      .map((msg) => ({
        role: msg.role === "user" ? "Caller" : "AI Operator",
        message: msg.message,
        time: msg.time,
        formattedTime: formatTime(new Date(msg.time).toISOString()),
      }))
      .sort((a, b) => a.time - b.time);
  };

  if (!selectedCall) {
    return (
      <div className="fixed right-0 top-0 mt-16 h-[calc(100vh-4rem)] w-[500px] bg-white shadow-md p-6 flex items-center justify-center z-10">
        <p className="text-gray-500 text-center">
          No call data available. Select a call to view details.
        </p>
      </div>
    );
  }

  const transcriptMessages = parseTranscriptMessages(selectedCall);
  const emergencyType = getEmergencyType(selectedCall.summary);
  const location = extractLocation(selectedCall.summary);
  const callDuration = selectedCall.endedAt
    ? Math.round(
        (new Date(selectedCall.endedAt).getTime() -
          new Date(selectedCall.startedAt).getTime()) /
          1000 /
          60
      )
    : 0;

  return (
    <div
      className={`fixed right-0 top-0 mt-16 h-[calc(100vh-4rem)] z-10 ${
        isMinimized ? "w-[50px]" : "w-[500px]"
      } transition-all duration-300`}
    >
      <div className="flex flex-col w-full h-full">
        <div
          className={`bg-white shadow-md ${isMinimized ? "p-0" : "p-3"} h-full`}
        >
          <div className="border-2 p-2 rounded-md flex justify-between mb-0 sticky top-0 bg-white z-10">
            <h3 className={isMinimized ? "hidden" : ""}>Call Details</h3>
            {isMinimized ? (
              <Maximize2
                className="cursor-pointer ml-auto"
                onClick={toggleMinimize}
              />
            ) : (
              <Minimize2 className="cursor-pointer" onClick={toggleMinimize} />
            )}
          </div>

          <div
            className={`${
              isMinimized ? "hidden" : "block"
            } overflow-y-auto h-[calc(100vh-7rem)] custom-scrollbar pr-2`}
          >
            <h2 className="text-2xl font-semibold mt-4">
              {selectedCall && analyzedCalls?.[selectedCall.id]
                ? `${analyzedCalls[selectedCall.id].category} Emergency in ${
                    analyzedCalls[selectedCall.id].location
                  }`
                : `${emergencyType} Emergency ${location && `in ${location}`}`}
            </h2>

            <h2 className="mt-3 font-semibold">Call Recording</h2>

            {selectedCall.artifact?.recordingUrl && (
              <div className="mt-1 mb-2">
                <audio
                  src={selectedCall?.artifact?.recordingUrl}
                  className="w-full rounded-full shadow-lg p-[0.5px] bg-gray-400"
                  controls
                >
                  Your browser does not support the audio element.
                </audio>
                {/* <Link
                  href={selectedCall?.artifact?.recordingUrl}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                >
                  {selectedCall?.artifact?.recordingUrl}
                </Link> */}
              </div>
            )}

            <div className="grid grid-cols-2 gap-0 mb-0 mt-3 border-t border-gray-200">
              <div className="border-b border-r border-gray-200 p-2">
                <p className="text-sm text-gray-500">Call Duration</p>
                <p className="text-gray-800">{callDuration} minutes</p>
              </div>
              <div className="border-b border-gray-200 p-2">
                <p className="text-sm text-gray-500">Type</p>
                <p className="text-gray-800">{emergencyType}</p>
              </div>
              <div className="border-r border-b border-gray-200 p-2">
                <p className="text-sm text-gray-500">Time</p>
                <p className="text-gray-800">
                  {formatTime(selectedCall.startedAt)}
                </p>
              </div>
              <div className="p-2 border-b border-gray-200">
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-gray-800 capitalize">
                  {selectedCall.status}
                </p>
              </div>
              <div className="border-r border-gray-200 p-2">
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-800">{location}</p>
              </div>
              <div className="p-2">
                <p className="text-sm text-gray-500">Caller</p>
                <p className="text-gray-800">
                  {selectedCall.customer?.number || "Unknown"}
                </p>
              </div>
            </div>

            <div className="border-b p-2 font-medium border-gray-200">
              <h3 className="font-medium">Summary</h3>
              <p className="text-gray-700">
                {selectedCall.summary || "No summary available"}
              </p>
            </div>

            <div className="flex flex-col p-4 bg-gray-50 rounded-lg mt-4">
              <h3 className="mb-3 pb-2 border-b border-gray-200 text-lg font-semibold">
                Live Transcript 
              </h3>
              <div className="flex items-center text-green-600 mb-4">
                <BotMessageSquare className="mr-2" />
                <span className="font-medium">
                  AI operator{" "}
                  {selectedCall.status === "ended"
                    ? "disconnected"
                    : "connected"}
                </span>
              </div>
              <div className="flex flex-row gap-4">
                <div className="flex-1 border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                  <h2 className="text-xs text-gray-500 mb-1 tracking-wide">
                    CALLER EMOTION
                  </h2>
                  {selectedCall && analyzedCalls?.[selectedCall.id] && (
                    <div className="space-y-3">
                      {Object.entries(
                        analyzedCalls[selectedCall.id].callerEmotions
                      ).map(([emotion, value]) => (
                        <div key={emotion}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500 capitalize">
                              {emotion}
                            </span>
                            <span className="text-xs text-gray-600">
                              {value}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${value}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex-1 border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                  <h2 className="text-xs text-gray-500 mb-1 tracking-wide">
                    CALLER INFO
                  </h2>
                  <div className="flex items-center mb-4">
                    <Phone className="mr-2 text-blue-500" />
                    <h1 className="font-bold text-xl text-gray-800">
                      {selectedCall.customer?.number}
                    </h1>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">
                        Call Duration
                      </span>
                      <span className="text-xs text-gray-600">
                        {callDuration} minutes
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3 bg-gray-100 p-3 rounded-lg">
              <h3 className="font-medium">Transcript Messages</h3>

              {transcriptMessages.length > 0 ? (
                transcriptMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 ${
                      msg.role === "AI Operator" ? "bg-blue-600" : "bg-white"
                    } rounded-lg`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        msg.role === "AI Operator"
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {msg.role} ({msg.formattedTime}):
                    </p>
                    <p
                      className={`${
                        msg.role === "AI Operator"
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {msg.message}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-gray-500">
                    No transcript messages available.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 mb-6">
              <h3 className="font-medium mb-2">Transcription Summary</h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                {selectedCall.analysis?.summary ||
                  selectedCall.summary ||
                  "No summary available"}
              </p>
            </div>
            <div className="mt-4 mb-6">
              <button
                onClick={async () => {
                  setIsTransferring(true);
                  // Simulate transfer delay
                  await new Promise((resolve) => setTimeout(resolve, 1500));
                  setTransferToHumanOperator(!transferToHumanOperator);
                  setIsTransferring(false);
                }}
                disabled={isTransferring}
                className={`px-4 py-2 rounded-md text-center w-full inline-flex items-center justify-center transition-all duration-300 ${
                  isTransferring
                    ? "bg-gray-500 cursor-not-allowed"
                    : transferToHumanOperator
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {isTransferring ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transferring...</span>
                    </>
                  ) : transferToHumanOperator ? (
                    <>
                      <Headset className="w-5 h-5" />
                      <span>Human Operator Connected</span>
                    </>
                  ) : (
                    <>
                      <ArrowLeftRight className="w-5 h-5" />
                      <span>Transfer to Human Operator</span>
                    </>
                  )}
                </div>
              </button>
            </div>
            {selectedCall && analyzedCalls?.[selectedCall.id] && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Severity</p>
                    <p className="text-lg font-bold text-red-500">
                      {analyzedCalls[selectedCall.id].severity.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="text-lg font-bold">
                      {analyzedCalls[selectedCall.id].category}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Recommended Actions</p>
                  <ul className="list-disc list-inside">
                    {analyzedCalls[selectedCall.id].recommendedActions.map(
                      (action, index) => (
                        <li key={index} className="text-gray-700">
                          {action}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Risk Assessment</p>
                  <p className="text-gray-700">
                    {analyzedCalls[selectedCall.id].riskAssessment}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranscriptSection;
