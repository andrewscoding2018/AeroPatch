// src/pages/index.js
import { useState } from "react";

export default function Home() {
  const [deviceName, setDeviceName] = useState("");
  const [deviceStatus, setDeviceStatus] = useState("Unknown");

  const handleCheckStatus = async () => {
    try {
      const response = await fetch(
        `/api/device/${encodeURIComponent(deviceName)}`
      );
      const data = await response.json();
      setDeviceStatus(data.status);
    } catch (error) {
      console.error("Error fetching device status:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={deviceName}
        onChange={(e) => setDeviceName(e.target.value)}
        placeholder="Enter Device Name"
      />
      <button onClick={handleCheckStatus}>Check Status</button>
      <p>Device Status: {deviceStatus}</p>
    </div>
  );
}
