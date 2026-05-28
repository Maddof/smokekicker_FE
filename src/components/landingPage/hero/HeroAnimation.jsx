"use client";
import { motion } from "framer-motion";

export function HeroContentWrapper({ type, children, ...props }) {
  const Component = type ? motion[type] : motion.div;
  return (
    <Component {...props}>
      {children}
      {/* Children are server-rendered, wrapper is client-animated */}
    </Component>
  );
}
