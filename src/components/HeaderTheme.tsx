"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Lets any page announce "I have a full-bleed dark photo behind my header"
// so Header can go transparent over it. Pages without a photo never call
// this, so the header stays solid there (transparent text would be
// unreadable over plain light content).
type HeaderThemeContextValue = {
  transparentCapable: boolean;
  register: () => void;
  unregister: () => void;
};

const HeaderThemeContext = createContext<HeaderThemeContextValue | null>(null);

export function HeaderThemeProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const register = () => setCount((c) => c + 1);
  const unregister = () => setCount((c) => Math.max(0, c - 1));

  return (
    <HeaderThemeContext.Provider value={{ transparentCapable: count > 0, register, unregister }}>
      {children}
    </HeaderThemeContext.Provider>
  );
}

export function useHeaderTransparentCapable() {
  const ctx = useContext(HeaderThemeContext);
  return ctx?.transparentCapable ?? false;
}

// Call from any page/section that renders a full-bleed photo directly under
// the header, so the header can go transparent over it while mounted.
export function useDeclarePhotoHero() {
  const ctx = useContext(HeaderThemeContext);
  useEffect(() => {
    if (!ctx) return;
    ctx.register();
    return () => ctx.unregister();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
