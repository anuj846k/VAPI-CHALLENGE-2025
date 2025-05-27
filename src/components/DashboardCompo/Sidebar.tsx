"use client";
import React, { useState } from "react";
import { EmergencyAnalysis } from "@/lib/gemini.service";

interface Call {
  id: string;
  summary: string;
  startedAt: string;
  status: string;
  endedReason?: string;
  analysis?: {
    successEvaluation: string;
  };
}

interface SidebarProps {
  calls?: Call[];
  selectedCallId?: string;
  onCallSelect?: (callId: string) => void;
  analyzedCalls?: Record<string, EmergencyAnalysis>;
}

const Sidebar: React.FC<SidebarProps> = ({
  calls = [],
  selectedCallId,
  onCallSelect,
  analyzedCalls,
}) => {
  const [filterText, setFilterText] = useState("");

  const filteredCalls = calls.filter(
    (call) => {
      if (filterText === "") {
        return true;
      }
      return call.summary?.toLowerCase().includes(filterText.toLowerCase());
    }
  );
  const totalIncidents = calls.length;
  const criticalIncidents = calls.filter(
    (call) => analyzedCalls?.[call.id]?.severity === 'critical'
  ).length;

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getSeverityLevel = (call: Call) => {
    const analysis = analyzedCalls?.[call.id];
    return analysis?.severity || 'medium';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-700';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };


  const getEmergencyType = (call: Call) => {
    const analysis = analyzedCalls?.[call.id];
    return analysis?.category || "Emergency";
  };

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-1/5 bg-white border-r border-black p-4 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-10"> All Emergencies</h1>

      <div className="flex justify-between mb-4 border shadow-md p-4 rounded-lg bg-gray-50">
        <div>
          <p className="text-sm text-gray-500">Total Incidents</p>
          <p className="text-lg font-bold text-gray-800">{totalIncidents}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Critical</p>
          <p className="text-lg font-bold text-red-500">{criticalIncidents}</p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Filter incidents..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="space-y-2">
        {filteredCalls.length > 0 ? (
          filteredCalls.map((call) => {
            const severity = getSeverityLevel(call);
            return (
              <div
                key={call.id}
                onClick={() => onCallSelect(call.id)}
                className={`p-3 ${
                  call.id === selectedCallId ? "border-2 border-blue-500" : ""
                } 
                            ${severity === 'critical' ? "bg-red-50" : 
                              severity === 'high' ? "bg-orange-50" :
                              severity === 'medium' ? "bg-yellow-50" :
                              "bg-green-50"} 
                            rounded-md cursor-pointer hover:bg-gray-100 transition-colors duration-200`}
              >
                <div className="flex justify-between items-center">
                  <p className="text-md font-semibold text-gray-800 line-clamp-2">
                    {getEmergencyType(call)} at{" "}
                    {call.summary?.split(" ").slice(-3).join(" ")}
                  </p>
                  <span
                    className={`text-xs ${getSeverityColor(severity)} text-white px-2 py-1 rounded`}
                  >
                    {severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Time : {formatTime(call.startedAt)}
                </p>
              </div>
            );
          })
        ) : (
          <div className="text-center py-4 text-gray-500">
            {filterText
              ? "No matching incidents found"
              : "No incidents available"}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
