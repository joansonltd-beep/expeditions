"use client";

import { useEffect, useRef } from "react";

const GOOGLE_CSE_ID = "f7dd1fa29b9fe48c6";
const SCRIPT_SRC = `https://cse.google.com/cse.js?cx=${GOOGLE_CSE_ID}`;

declare global {
  interface Window {
    __gcse?: { parsetags?: "explicit"; callback?: () => void };
    google?: { search?: { cse?: { element?: { render: (opts: { div: string; tag: "search" }) => void } } } };
  }
}

// Google's default embed scans the whole page for .gcse-search elements and
// self-initializes the moment its script tag executes. That auto-scan
// conflicts with how React/Next.js control when/how scripts and DOM nodes
// get inserted (double-render in dev, hydration timing in prod), and throws
// instead of rendering. Explicit rendering sidesteps this: we tell the
// script not to auto-scan, and call element.render() ourselves exactly once,
// once we know both the script and our target div actually exist.
export default function JobSearchWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    function renderWidget() {
      if (renderedRef.current || !containerRef.current || !window.google?.search?.cse?.element) return;
      renderedRef.current = true;
      window.google.search.cse.element.render({ div: containerRef.current.id, tag: "search" });
    }

    window.__gcse = window.__gcse || {};
    window.__gcse.parsetags = "explicit";
    window.__gcse.callback = renderWidget;

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      renderWidget();
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div id="job-search-gcse" ref={containerRef} />;
}
