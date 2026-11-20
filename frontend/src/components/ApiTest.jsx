
import { useEffect, useState } from "react";
import api from "../services/api";

function ApiTest() {
  const [status, setStatus] = useState("Checking backend...");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await api.get("/skills/");

        setStatus(
          `Connected successfully! Skills found: ${response.data.length}`
        );
      } catch (err) {
        console.error("API connection error:", err);

        setStatus("Backend connection failed.");
        setError(
          err.response?.data?.detail ||
          err.message ||
          "Unknown error"
        );
      }
    };

    checkBackend();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Django API Connection Test</h2>
      <p>{status}</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default ApiTest;
