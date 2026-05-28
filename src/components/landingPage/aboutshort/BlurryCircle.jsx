"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollBlob() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const desktopX = useTransform(scrollYProgress, [0.1, 1], ["-50vw", "80vw"]);
  const mobileY = useTransform(scrollYProgress, [0.2, 1], ["0vh", "95vh"]);

  return (
    <div ref={targetRef} className="absolute inset-0">
      <motion.div
        style={{ x: desktopX }}
        className="absolute top-2 left-1/2 -z-10 hidden h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl md:block"
      />

      <motion.div
        style={{ y: mobileY }}
        className="absolute top-0 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl md:hidden"
      />
    </div>
  );
}
