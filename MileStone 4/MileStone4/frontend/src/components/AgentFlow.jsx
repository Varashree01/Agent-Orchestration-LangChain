import { FaRobot, FaCalculator, FaFeather, FaCloudSun, FaRocket, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import "./AgentFlow.css";

const agentConfig = {
  MATH_AGENT: {
    icon: <FaCalculator className="agent-icon" />,
    color: "#a78bfa",
    label: "MATH AGENT",
    description: "Solving calculations"
  },
  POEM_AGENT: {
    icon: <FaFeather className="agent-icon" />,
    color: "#c4b5fd",
    label: "POEM AGENT",
    description: "Creating verses"
  },
  WEATHER_AGENT: {
    icon: <FaCloudSun className="agent-icon" />,
    color: "#ddd6fe",
    label: "WEATHER AGENT",
    description: "Checking conditions"
  },
  LAUNCH_VEHICLE_AGENT: {
    icon: <FaRocket className="agent-icon" />,
    color: "#e9d5ff",
    label: "LAUNCH AGENT",
    description: "Tracking missions"
  },
  TODOIST_AGENT: {
    icon: <FaCheckCircle className="agent-icon" />,
    color: "#f3e8ff",
    label: "TASK AGENT",
    description: "Managing todos"
  },
  SUPERVISOR: {
    icon: <FaRobot className="agent-icon" />,
    color: "#8b5cf6",
    label: "SUPERVISOR",
    description: "Orchestrating agents"
  }
};

export default function AgentFlow({ steps }) {
  return (
    <div className="agent-flow">
      <h2 className="agent-flow-title">Agent Execution</h2>

      {steps.length === 0 ? (
        <motion.div
          className="agent-empty"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaRobot className="empty-icon" />
          <p>Waiting for agent execution...</p>
        </motion.div>
      ) : (
        <motion.div className="agent-steps" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {steps.map((step, idx) => {
            const config = agentConfig[step.type] || agentConfig.SUPERVISOR;
            return (
              <motion.div
                key={idx}
                className="agent-step"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.2 }}
                style={{ borderLeftColor: config.color }}
              >
                <div className="step-header">
                  <div className="step-icon" style={{ color: config.color }}>
                    {config.icon}
                  </div>
                  <div className="step-info">
                    <h3 className="step-label">{config.label}</h3>
                    <p className="step-description">{config.description}</p>
                  </div>
                </div>
                <div className="step-content">{step.content}</div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

