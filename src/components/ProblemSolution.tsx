import React from "react";
import Image from "next/image";
import {
  FiPhoneCall,
  FiUsers,
  FiClock,
  FiTrendingDown,
  FiAlertTriangle,
  FiShield,
} from "react-icons/fi";
import Container from "./Container";
import SectionTitle from "./SectionTitle";

const ProblemSolution: React.FC = () => {
  const statistics = [
    {
      icon: <FiUsers size={28} />,
      percentage: "82%",
      label: "of 911 Call Centers are Understaffed",
      color: "text-red-500",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
    },
    {
      icon: <FiClock size={28} />,
      percentage: "15min",
      label: "Average Response Time Delay",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
    },
    {
      icon: <FiPhoneCall size={28} />,
      percentage: "240M",
      label: "Emergency Calls Made Annually",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
    },
    {
      icon: <FiTrendingDown size={28} />,
      percentage: "35%",
      label: "Increase in Emergency Calls",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
    },
  ];

  const problemPoints = [
    {
      icon: <FiAlertTriangle size={20} className="text-red-500" />,
      text: "Critical staff shortages across emergency centers",
    },
    {
      icon: <FiClock size={20} className="text-red-500" />,
      text: "Delayed response times during peak hours",
    },
    {
      icon: <FiUsers size={20} className="text-red-500" />,
      text: "Overwhelmed operators making critical errors",
    },
  ];

  const solutionPoints = [
    {
      icon: <FiShield size={20} className="text-green-500" />,
      text: "24/7 AI-powered emergency response",
    },
    {
      icon: <FiPhoneCall size={20} className="text-green-500" />,
      text: "Instant triage and resource dispatch",
    },
    {
      icon: <FiTrendingDown size={20} className="text-green-500" />,
      text: "Real-time monitoring and analytics",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <Container>
        <div className="text-center mb-20 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
            <FiAlertTriangle size={32} className="text-red-500" />
          </div>

          <SectionTitle>
            <h2 className="text-center mb-6 bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 bg-clip-text text-transparent">
              The Emergency Response Crisis
            </h2>
          </SectionTitle>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Emergency call centers are overwhelmed and understaffed, leading to
            delayed response times when every second counts.{" "}
            <span className="font-semibold text-gray-800">Sahara AI</span>{" "}
            bridges this critical gap with intelligent automation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 text-center border border-white/50 backdrop-blur-sm group hover:scale-105 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 ${stat.iconBg} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <span className={stat.color}>{stat.icon}</span>
                </div>
                <div
                  className={`text-4xl lg:text-5xl font-bold mb-3 ${stat.color} group-hover:scale-105 transition-transform duration-300`}
                >
                  {stat.percentage}
                </div>
                <p className="text-gray-700 font-medium leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FiAlertTriangle size={24} className="text-red-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  The Problem
                </h3>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className=" w-full aspect-[3/2] relative rounded-xl shadow-2xl overflow-hidden">
                <Image
                  src="/images/call-cent.png"
                  alt="Understaffed call center showing the emergency response crisis"
                  fill
                  className="object-cover"
                  sizes="(max-width: 600px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-red-500/20 to-transparent rounded-xl flex items-center justify-center">
                  <div className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-lg backdrop-blur-sm shadow-xl">
                    UNDERSTAFFED
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {problemPoints.map((point, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-4 p-6 bg-white rounded shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-200 hover:border-red-400 transform hover:translate-x-2"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-full flex items-center justify-center group-hover:bg-red-100 transition-colors duration-300 shadow-sm">
                    {point.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 font-medium pt-2 group-hover:text-gray-900 transition-colors duration-300 leading-relaxed">
                      {point.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FiShield size={24} className="text-green-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  Our Solution
                </h3>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1  rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="w-full aspect-[3/2] relative rounded-xl shadow-2xl overflow-hidden">
                <Image
                  src="/images/dashboard.png"
                  alt="Sahara AI Dashboard showing emergency response analytics and real-time monitoring"
                  fill
                  className="object-contain"
                  sizes="(max-width: 600px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-green-500/20 to-transparent rounded-xl flex items-center justify-center">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-bold text-lg backdrop-blur-sm shadow-xl">
                    AI-POWERED
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {solutionPoints.map((point, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-4 p-6 bg-white rounded shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-200 hover:border-green-400 transform hover:translate-x-2"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300 shadow-sm">
                    {point.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 font-medium pt-2 group-hover:text-gray-900 transition-colors duration-300 leading-relaxed">
                      {point.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-20 mb-20">
          <div className="w-full max-w-6xl flex flex-col gap-16 p-4 md:p-8 rounded-lg  ">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-3xl md:text-5xl font-black text-center mb-8 md:mb-10 uppercase tracking-tight">
                Emergency{" "}
                <span className="bg-gradient-to-r from-red-400 to-red-500 text-white px-4 py-2 rounded-md inline-block shadow-xl">
                  Response
                </span>{" "}
                Dashboard
              </h1>
              <div className="w-full flex justify-center">
                <Image
                  src="/images/image.png"
                  alt="Dashboard"
                  className="rounded-lg border-2 border-gray-300 shadow-lg object-contain"
                  width={900}
                  height={500}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center mt-40 ">
              <h1 className="text-2xl md:text-5xl font-black text-center mb-8 md:mb-10 uppercase tracking-tight">
                Live{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 rounded-md inline-block shadow-xl">
                  Transcript
                </span>{" "}
                & Caller{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-md inline-block shadow-xl">
                  Emotions
                </span>{" "}
              </h1>
              <div className="w-full flex justify-center">
                <video
                  src="/images/liveTranscripts.mp4"
                  autoPlay

                  muted
                  
                  className="border-2 border-gray-200 rounded-lg shadow-xl object-contain"
                ></video>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProblemSolution;
