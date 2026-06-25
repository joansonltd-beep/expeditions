"use client";

import { createContext, useContext } from "react";

// Carries the Sanity-sourced settings the client CTAs need (WhatsApp number,
// chat bot URL, general email), so no component hardcodes them.
type ClientSettings = {
  whatsappNumber: string;
  chatbotUrl: string;
  generalEmail: string;
};

const SettingsContext = createContext<ClientSettings>({
  whatsappNumber: "8687236644",
  chatbotUrl: "https://chatbot-c359f6.zapier.app",
  generalEmail: "info@expeditionswithjo.com",
});

export function SiteSettingsProvider({
  value,
  children,
}: {
  value: ClientSettings;
  children: React.ReactNode;
}) {
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSiteClient(): ClientSettings {
  return useContext(SettingsContext);
}

// Builds a WhatsApp deep link from a message.
export function useWhatsAppLink(): (message: string) => string {
  const { whatsappNumber } = useContext(SettingsContext);
  return (message: string) =>
    `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
