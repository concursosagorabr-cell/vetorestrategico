"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  children: React.ReactNode;
}

export const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
  ...props
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 24, opacity: 0 };
      case "down":
        return { y: -24, opacity: 0 };
      case "left":
        return { x: 24, opacity: 0 };
      case "right":
        return { x: -24, opacity: 0 };
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
