"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const Agent = ({ userName }) => {
  const isSpeaking = true;
  const [callStatus] = useState<CallStatus>(CallStatus.INACTIVE);

  return (
    <>
      <div className="flex sm:flex-row flex-col gap-10 items-center justify-between w-full">
        <div className="flex items-center flex-col gap-3 p-8 rounded-2xl h-[400px] bg-white border border-blue-200 shadow-lg flex-1 sm:basis-1/2 w-full justify-center">
          <div className="relative w-[120px] h-[120px] rounded-full bg-gradient-to-l from-[#e6eeff] to-[#d8e3ff] flex items-center justify-center border-2 border-blue-100">
            <Image
              src="/images/ai-avatar.png"
              alt="profile-image"
              width={100}
              height={100}
              className="object-cover rounded-full"
            />
            {isSpeaking && (
              <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-75" />
            )}
          </div>

          <h3 className="text-gray-800 text-2xl font-semibold">Disas AI</h3>
        </div>

        <div className="rounded-2xl flex-1 sm:basis-1/2 w-full h-[400px] max-md:hidden shadow-lg border border-blue-200">
          <div className="flex flex-col gap-3 justify-center items-center p-8 bg-white rounded-2xl min-h-full">
            <div className="relative w-[120px] h-[120px]">
              <Image
                src="/images/user-image.png"
                alt="UserImage"
                width={540}
                height={540}
                className="rounded-full object-cover size-[120px] border-2 border-blue-100"
              />
              <span className="absolute bottom-1 right-1 size-4 rounded-full bg-green-500 border-2 border-white" />
            </div>
            <h3 className="text-gray-800 text-2xl font-semibold">{userName}</h3>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-10">
        {callStatus !== "ACTIVE" ? (
          <button className="relative inline-block px-7 py-3 font-bold text-sm leading-5 text-white transition-colors duration-150 bg-[#42c748] border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-[#42c748] hover:bg-[#29982e] min-w-28 cursor-pointer items-center justify-center overflow-visible">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="inline-block px-7 py-3 text-sm font-bold leading-5 text-white transition-colors duration-150 bg-[#f75353] border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-[#c44141] hover:bg-destructive-200 min-w-28">
            END
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
