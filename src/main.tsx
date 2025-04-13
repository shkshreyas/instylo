import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "@/context/AuthContext";
import { QueryProvider } from "@/lib/react-query/QueryProvider";

import App from "./App";

// Initialize environment variables
// Create a global window object for storing environment values
declare global {
  interface Window {
    ENV_CONFIG: Record<string, string>;
  }
}

window.ENV_CONFIG = {
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || 'mock-mode',
  WEATHER_API_KEY: import.meta.env.VITE_WEATHER_API_KEY || 'mock-mode',
  ENABLE_VOICE: import.meta.env.VITE_ENABLE_VOICE || 'true',
  ENABLE_WEATHER: import.meta.env.VITE_ENABLE_WEATHER || 'true',
  DEFAULT_TONE: import.meta.env.VITE_DEFAULT_TONE || 'friendly',
};

// Error Handler for React Rendering
const renderApp = () => {
  try {
    // Get root element
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error("Root element not found");
    }

    // Render React app
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <BrowserRouter>
          <QueryProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </QueryProvider>
        </BrowserRouter>
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Failed to initialize or render application:", error);
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="font-family: system-ui; padding: 20px; text-align: center; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d00;">Application Error</h2>
          <p>An error occurred while initializing the application.</p>
          <p style="font-family: monospace; background: #f5f5f5; padding: 10px; border-radius: 4px; text-align: left;">
            ${error instanceof Error ? error.message : String(error)}
          </p>
          <button onclick="window.location.reload()" style="background: #4d7c0f; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
            Reload Application
          </button>
        </div>
      `;
    }
  }
};

// Start the application
renderApp();
