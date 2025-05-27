import React from "react";
import GoogleMapComponent from "./GoogleMapComponent";
import { EmergencyAnalysis } from "@/lib/gemini.service";

const MapSection = ({
  locationCoordinates,
}: {
  locationCoordinates: EmergencyAnalysis["locationCoordinates"];
}) => {
  return (
    <div className="flex ">
      <div className="w-full h-full ">
        <GoogleMapComponent locationCoordinates={locationCoordinates} />
      </div>

      {/* Incident Details */}
      {/* <div className="w-1/2 p-4 bg-white shadow-md rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Earthquake Emergency at Golden Gate Bridge
          </h3>
          <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
            CRITICAL
          </span>
        </div>
        <img
          src="https://via.placeholder.com/300x150?text=Golden+Gate+Bridge"
          alt="Golden Gate Bridge"
          className="w-full h-32 object-cover rounded-md mb-4"
        />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Time of Call</p>
            <p className="text-gray-800">3:16:37 AM</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-gray-800">
              Golden Gate Bridge, San Francisco, CA
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-2">Summary</p>
        <p className="text-gray-800">
          Caller reports current earthquake and requests immediate assistance.
          Many people injured.
        </p>
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Caller Emotion</p>
          <div className="flex space-x-4">
            <div>
              <p className="text-sm text-gray-800">Fear: 35%</p>
              <div className="w-20 h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-purple-500 rounded"
                  style={{ width: "35%" }}
                ></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-800">Confusion: 27%</p>
              <div className="w-20 h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-blue-500 rounded"
                  style={{ width: "27%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MapSection;
