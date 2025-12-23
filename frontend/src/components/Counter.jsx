"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

export default function Counter({number}) {
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, number, { duration: 2 });
    return () => controls.stop();
  }, []);

  return <motion.pre style={text} className="text-[30px] sm:text-[40px]">{rounded}</motion.pre>;
}

/**
 * ==============   Styles   ================
 */

const text = {
  fontFamily: "sans-serif"
};