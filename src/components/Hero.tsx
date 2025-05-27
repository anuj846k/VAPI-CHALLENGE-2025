"use client";

import React, { useEffect, useState } from "react";
import { Globe } from "@/components/ui/globe";
import { heroDetails } from "@/data/hero";
import Link from "next/link";
import { motion } from "framer-motion";

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  onRender: () => null,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1] as [number, number, number],
  markerColor: [1, 59 / 255, 48 / 255] as [number, number, number],
  glowColor: [1, 1, 1] as [number, number, number],
  markers: [
    { location: [37.7749, -122.4194] as [number, number], size: 0.08 },
    { location: [34.0522, -118.2437] as [number, number], size: 0.08 },
    { location: [29.7604, -95.3698] as [number, number], size: 0.1 },
    { location: [25.7617, -80.1918] as [number, number], size: 0.08 },
    { location: [35.6762, 139.6503] as [number, number], size: 0.09 },
    { location: [19.4326, -99.1332] as [number, number], size: 0.08 },
    { location: [-33.8688, 151.2093] as [number, number], size: 0.07 },
    { location: [28.6139, 77.209] as [number, number], size: 0.1 },
    { location: [6.5244, 3.3792] as [number, number], size: 0.08 },
    { location: [-22.9068, -43.1729] as [number, number], size: 0.09 },
  ],
};

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center px-5 pb-12 pt-20 md:pt-28 min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 w-full h-full">
        <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      </div>

      <div className="absolute left-0 right-0 bottom-0 h-40 backdrop-blur-[2px] bg-gradient-to-b from-transparent via-[rgba(233,238,255,0.5)] to-[rgba(202,208,230,0.5)] z-0"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] -z-5 opacity-20">
        <div
          className="absolute inset-0 rounded-full bg-red-500 animate-ping"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute inset-0 rounded-full bg-red-500 animate-ping"
          style={{ animationDuration: "3s", animationDelay: "1s" }}
        ></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center z-10 mb-12 md:mb-16"
      >
        <div className="mt-6 mb-10 p-2 bg-white/30  drop-shadow-2xl backdrop-blur-xl border border-white/30 shadow-lg max-w-[270px] mx-auto flex items-center justify-center space-x-2 rounded-full">
          <span className="inline-block h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm font-medium text-gray-700">
            Systems operational worldwide
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl md:leading-tight font-bold text-foreground max-w-lg md:max-w-4xl mx-auto">
          Sahara AI Disaster{" "}
          <span className="  bg-gradient-to-r from-red-400 shadow-2xl to-red-500 text-white px-4 py-2 rounded-md inline-block transform ">
            Response
            <div className="absolute top-1 -mt-5  -right-8 z-20 flex items-center space-x-2 bg-white md:px-3 p-1 md:py-1.5 rounded-full shadow-sm">
              <span className="inline-block md:h-2 md:w-2 h-1 w-1 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-xs font-medium text-gray-700 md:block hidden  ">
                Live monitoring
              </span>
            </div>
          </span>{" "}
          Agent
        </h1>
        <p className="mt-6 text-lg text-gray-700 max-w-lg mx-auto">
          {heroDetails.subheading}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative flex size-full w-full max-w-5xl mx-auto items-center justify-center    "
      >
        <Globe
          className="scale-125 transform-gpu"
          config={GLOBE_CONFIG }
        />

        <div className="pointer-events-none absolute inset-0 h-full rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent"></div>
        </div>
      </motion.div>

      {/* Call to action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center z-10"
      >
        <Link
          href="/call-agent"
          className="px-8 py-4 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span className="group-hover:translate-x-1 transition-transform duration-200">
            Emergency Calls
          </span>
        </Link>
        <Link
          href="/dashboard"
          className="px-8 py-4 bg-white hover:bg-gray-50 text-red-600 font-medium rounded-full border-2 border-red-500 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center group"
        >
          <span className="group-hover:translate-x-1 transition-transform duration-200">
            Try Demo
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
