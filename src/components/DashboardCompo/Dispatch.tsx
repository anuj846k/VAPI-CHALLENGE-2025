import { Plus, Clock, MapPin, Phone, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { emergencyServices } from "@/data/dispatch";
import toast from "react-hot-toast";

const Dispatch = ({ isMinimized }: { isMinimized: boolean }) => {
  const [services, setServices] = useState(emergencyServices);
  const [activeTab, setActiveTab] = useState("dispatch");

  const toggleService = (id: number) => {
    setServices(
      services.map((service) => {
        const isDispatching = !service.dispatched && service.id === id;
        const newService = {
          ...service,
          dispatched:
            service.id === id ? !service.dispatched : service.dispatched,
        };

        if (isDispatching) {
          toast.success(
            `${service.name} unit dispatched! ETA: ${service.eta}`,
            {
              duration: 4000,
              position: "top-right",
              icon: service.icon,
            }
          );
        } else if (service.id === id) {
          toast(`${service.name} dispatch cancelled`, {
            duration: 3000,
            position: "top-right",
            icon: "ℹ️",
          });
        }

        return newService;
      })
    );
  };

  const handleRequestAdditionalUnits = () => {
    toast.promise(
      new Promise((resolve) => {
        // Simulate API call
        setTimeout(() => {
          resolve("Additional units requested successfully");
        }, 1500);
      }),
      {
        loading: "Requesting additional units...",
        success: (message) => String(message),
        error: (err) => `Error: ${err.toString()}`,
      }
    );
  };

  const handleMessageAll = () => {
    const dispatchedServices = services.filter((s) => s.dispatched);
    if (dispatchedServices.length === 0) {
      toast.error("No units are currently dispatched");
      return;
    }
    toast.success(`Message sent to ${dispatchedServices.length} units`, {
      position: "top-right",
    });
  };

  const handleCallCommander = () => {
    toast("Calling emergency commander...", {
      icon: "📞",
      duration: 2000,
      position: "top-right",
    });
  };

  const totalDispatched = services.filter((s) => s.dispatched).length;

  return (
    <div
      className={`fixed right-[500px] top-0 mt-16 h-auto z-10 transition-all duration-300 ease-in-out ${
        isMinimized
          ? "w-0 opacity-0 pointer-events-none"
          : "w-[300px] opacity-100"
      } bg-white shadow-lg rounded-l-lg overflow-hidden flex flex-col border border-gray-200`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
        <h2
          className={`text-lg font-semibold text-gray-800 transition-opacity duration-300 ${
            isMinimized ? "opacity-0" : "opacity-100"
          }`}
        >
          Emergency Dispatch
        </h2>
        <div className="flex items-center justify-between space-x-2">
          {!isMinimized && (
            <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full flex items-center">
              {totalDispatched}
              <span className="ml-2">Dispatched</span>
            </span>
          )}
        </div>
      </div>
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("dispatch")}
          className={`flex-1 py-3 px-4 text-sm font-medium text-center ${
            activeTab === "dispatch"
              ? "text-blue-600 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Dispatch Units
        </button>
        <button
          onClick={() => setActiveTab("status")}
          className={`flex-1 py-3 px-4 text-sm font-medium text-center ${
            activeTab === "status"
              ? "text-blue-600 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Status Updates
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">Available Units</h3>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>
              ETA: {Math.max(...services.map((s) => parseInt(s.eta)))} min
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                service.dispatched ? service.activeColor : service.color
              }`}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 mb-2">
                {service.icon}
              </div>
              <span className="font-medium">{service.name}</span>
              <span className="text-xs mt-1">{service.eta}</span>
              {service.dispatched && (
                <span className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center bg-white/90 rounded-full text-xs font-bold">
                  {service.units}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <button
            onClick={handleRequestAdditionalUnits}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Request Additional Units</span>
          </button>

          <div className="flex space-x-2">
            <button
              onClick={handleMessageAll}
              className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message All</span>
            </button>
            <button
              onClick={handleCallCommander}
              className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Commander</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === "status" && (
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-3">
            {services
              .filter((s) => s.dispatched)
              .map((service) => (
                <div key={service.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`p-2 rounded-lg ${
                          service.color
                            .replace("hover:bg-", "bg-")
                            .split(" ")[0]
                        }`}
                      >
                        {service.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{service.name} Unit</h4>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>En route - ETA: {service.eta}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dispatch;
