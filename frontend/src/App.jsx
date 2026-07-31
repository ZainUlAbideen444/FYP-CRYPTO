import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import PreLoader from "./components/UI/PreLoader";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Show Custom Crypto Splash Screen */}
      {isLoading && <PreLoader onFinish={() => setIsLoading(false)} />}

      {/* Main Application Routes */}
      <div
        className={
          isLoading
            ? "opacity-0 h-0 overflow-hidden"
            : "opacity-100 transition-opacity duration-500"
        }
      >
        <AppRoutes />
      </div>
    </>
  );
}

export default App;