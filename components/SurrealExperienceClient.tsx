"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useState } from "react";

// Dynamically import the client-side canvas
const StarryBackground = dynamic(() => import("./StarryBackground"), {
  ssr: false,
  loading: () => <FallbackBackground />,
});

// Gradient fallback during SSR + hydration
const FallbackBackground = () => (
  <div
    className="fixed inset-0 blur-[2px]"
    style={{
      background: "linear-gradient(45deg, #fff1f2, #eff6ff, #f5f3ff, #fdf2f8)",
      zIndex: -1,
    }}
  />
);

const SurrealExperienceClient = () => {
  const [running, setRunning] = useState(true);
  const [mode, setMode] = useState<"high" | "smooth">("high");

  return (
    <motion.div style={{ minHeight: "0vh" }}>
      {/* Background */}
      <StarryBackground running={running} mode={mode} />

      {/* Controls */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setRunning((prev) => !prev)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-lg text-sm "
        >
          {running ? "Pause Animations" : "Resume Animations"}
        </button>

        {/* <button
          onClick={() => setMode((prev) => (prev === "high" ? "smooth" : "high"))}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-lg"
        >
          {mode === "high" ? "Switch to Smooth Mode" : "Switch to High Quality"}
        </button> */}
      </div>
    </motion.div>
  );
};

export default SurrealExperienceClient;
