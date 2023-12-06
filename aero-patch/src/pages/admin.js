// src/pages/admin.js
import { useEffect, useState } from "react";

export default function Admin() {
  const [devices, setDevices] = useState([]);

  const fetchDevices = async () => {
    try {
      const response = await fetch("/api/devices");
      const data = await response.json();
      setDevices(data.devices);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const toggleDeviceStatus = async (deviceId) => {
    try {
      await fetch(`/api/device/${deviceId}`, { method: "POST" });
      fetchDevices();
    } catch (error) {
      console.error("Error toggling device status:", error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <ul>
        {devices.map((device) => (
          <li key={device.deviceId}>
            {device.name} - {device.status}
            <button onClick={() => toggleDeviceStatus(device.deviceId)}>
              Toggle Status
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
