"use client";

import { useEffect } from "react";
import { useProfile } from "@/context/ProfileContext";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeWrapper() {
  const { themeTier } = useProfile();
  const { dark } = useTheme();

  useEffect(() => {
    const html = document.documentElement;

    // Remove all theme classes first
    html.classList.remove("theme-kids", "theme-teen", "theme-scholar");

    // Apply the correct tier
    html.classList.add(`theme-${themeTier}`);

    // Apply dark mode on top
    if (dark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [themeTier, dark]);

  return null;
}