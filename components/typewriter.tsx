"use client";

import { use } from "react";
import { Typewriter } from "react-simple-typewriter";
export default function TypewriterComponent() {
  return (
    <Typewriter
      words={["Buzz!", "Talk!", "Share!", "Influence!", "Help!", "Grow!"]}
      cursor
      loop={0}
    />
  );
}
