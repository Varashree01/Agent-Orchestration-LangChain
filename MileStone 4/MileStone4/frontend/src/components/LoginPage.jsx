import { useState } from "react";
import { motion } from "framer-motion";
import { VarixLogo } from "./Logos";
import { useTheme } from "../ThemeProvider";
import "./LoginPage.css";

export default function LoginPage({ onLogin }) {
  const { isDark } = useTheme();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onLogin(username);
    setIsLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <div className={`login-container ${isDark ? 'dark' : 'light'}`}>
      <div className="login-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <motion.div
        className="login-card"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="login-header" variants={itemVariants}>
          <VarixLogo size={56} />
          <h1 className="brand-title">VARIX</h1>
          <p className="brand-subtitle">Your Multi-Agent Intelligence Platform</p>
        </motion.div>

        <motion.form onSubmit={handleLogin} variants={itemVariants} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Enter your name</label>
            <input
              id="username"
              type="text"
              placeholder="Your name (e.g., Varashree)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
              disabled={isLoading}
              autoFocus
              className="form-input"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading || !username.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="login-button"
          >
            {isLoading ? (
              <>
                <span className="loader"></span>
                Signing in...
              </>
            ) : (
              <>
                Enter VARIX
                <span className="button-icon">→</span>
              </>
            )}
          </motion.button>
        </motion.form>

        <motion.div className="login-footer" variants={itemVariants}>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon"></span>
              <span>Multi-Agent AI</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon"></span>
              <span>Persistent Memory</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon"></span>
              <span>Dark Mode</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
