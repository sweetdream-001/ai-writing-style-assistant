import { useEffect, useState } from "react";
import axios from "axios";
import { RephraseApp } from "./components/RephraseApp";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { PageLayout } from "./components/layout/PageLayout";

function App() {
  const [connectionStatus, setConnectionStatus] = useState("checking"); // "connected", "disconnected", "checking"
  const [backendMessage, setBackendMessage] = useState("");
  
  const checkConnection = async () => {
    try {
      // Try health endpoint first (faster)
      const healthRes = await axios.get("http://localhost:8000/health", { timeout: 3000 });
      
      if (healthRes.data.status === "ok") {
        // Health is good, get the hello message
        try {
          const helloRes = await axios.get("http://localhost:8000/hello", { timeout: 3000 });
          setBackendMessage(helloRes.data.message);
          setConnectionStatus("connected");
        } catch {
          // Health works but hello failed - still connected
          setBackendMessage("Backend connected");
          setConnectionStatus("connected");
        }
      }
    } catch (error) {
      setConnectionStatus("disconnected");
      setBackendMessage("Backend disconnected");
      console.log("Backend connection failed:", error.message);
    }
  };

  useEffect(() => {
    checkConnection();
    
    // Check connection every 10 seconds
    const interval = setInterval(checkConnection, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header connectionStatus={connectionStatus} backendMessage={backendMessage} />
      
      <PageLayout>
        <RephraseApp />
      </PageLayout>
      
      <Footer />
    </div>
  );
}



export default App;
