import { Shield, Ambulance, Flame, PlaneTakeoff } from "lucide-react";

export const emergencyServices = [
  {
    id: 1,
    name: "Police",
    icon: <Shield className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    activeColor: "bg-blue-600 hover:bg-blue-700 text-white",
    dispatched: false,
    eta: "7 min",
    units: 2,
  },
  {
    id: 2,
    name: "Ambulance",
    icon: <Ambulance className="w-5 h-5" />,
    color: "bg-red-100 text-red-700 hover:bg-red-200",
    activeColor: "bg-red-600 hover:bg-red-700 text-white",
    dispatched: false,
    eta: "5 min",
    units: 1,
  },
  {
    id: 3,
    name: "Fire Brigade",
    icon: <Flame className="w-5 h-5" />,
    color: "bg-orange-100 text-orange-700 hover:bg-orange-200",
    activeColor: "bg-orange-600 hover:bg-orange-700 text-white",
    dispatched: false,
    eta: "12 min",
    units: 3,
  },
  {
    id: 4,
    name: "Helicopter",
    icon: <PlaneTakeoff className="w-5 h-5" />,
    color: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    activeColor: "bg-purple-600 hover:bg-purple-700 text-white",
    dispatched: false,
    eta: "15 min",
    units: 1,
  },
];
