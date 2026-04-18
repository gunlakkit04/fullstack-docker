"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API_HOST;

    fetch(`${api}/attractions`)
      .then((res) => res.json())
      .then((json) => setData(json.data || []));
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f172a" }}>

      {/* Sidebar */}
      <aside style={{
        width: "220px",
        background: "#1e293b",
        padding: "20px",
        color: "white"
      }}>
        <h2>🌍 Menu</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>Dashboard</li>
          <li>Attractions</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "20px" }}>
        <h1 style={{ color: "white" }}>Attractions</h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px"
        }}>
          {data.map((item) => (
            <div key={item.id} style={{
              background: "#1e293b",
              color: "white",
              borderRadius: "12px",
              overflow: "hidden"
            }}>

              <img
                src={item.coverimage}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover"
                }}
              />

              <div style={{ padding: "10px" }}>
                <h3>{item.name}</h3>
                <p style={{ fontSize: "14px", opacity: 0.8 }}>
                  {item.detail}
                </p>
                <small>
                  📍 {item.latitude}, {item.longitude}
                </small>
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}