import {  FiBarChart2, FiTarget, FiTrendingUp } from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Intelligent Emergency Response",
        description: "AI-powered voice assistance that understands emergency situations and provides immediate, actionable guidance when every second counts.",
        bullets: [
            {
                title: "Real-Time Assessment",
                description: "Instantly analyzes emergency situations through natural language processing.",
                icon: <FiBarChart2 size={26} />
            },
            {
                title: "Emergency Protocols",
                description: "Guides you through proper emergency procedures step-by-step.",
                icon: <FiTarget size={26} />
            },
            {
                title: "Predictive Insights",
                description: "Anticipates emergency needs and suggests preventive measures.",
                icon: <FiTrendingUp size={26} />
            }
        ],
        imageSrc: "/images/agent.png"
    },
]