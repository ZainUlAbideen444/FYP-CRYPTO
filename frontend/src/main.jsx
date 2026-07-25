import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { TradeProvider } from "./context/TradeContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <TradeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TradeProvider>
    </AuthProvider>
  </StrictMode>
);
