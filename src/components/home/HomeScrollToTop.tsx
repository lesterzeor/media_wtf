"use client";

import { useLayoutEffect } from "react";

/** Ensures the window is at the top whenever the home route is shown (including client navigations). */
export function HomeScrollToTop() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
