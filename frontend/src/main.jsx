import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { TradeProvider } from "./context/TradeContext";
import { MarketProvider } from "./context/MarketContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MarketProvider>
          <TradeProvider>
            <App />
          </TradeProvider>
        </MarketProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);