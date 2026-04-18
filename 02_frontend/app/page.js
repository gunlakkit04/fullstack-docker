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
    <div style={{ display: "flex", height: "100vh", background: "#0f172a" }}>

      {/* SIDEBAR */}
      <aside style={{
        width: "240px",
        background: "#1e293b",
        padding: "20px",
        color: "white"
      }}>
        <h2 style={{ marginBottom: 20 }}>🌍 Travel Admin</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button style={btn}>Dashboard</button>
          <button style={btn}>Attractions</button>
          <button style={btn}>Analytics</button>
          <button style={btn}>Settings</button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}>

        {/* TOP HEADER */}
        <div style={{
          background: "#1e293b",
          padding: "15px",
          borderRadius: "12px",
          color: "white",
          marginBottom: "20px"
        }}>
          <h1 style={{ margin: 0 }}>Dashboard</h1>
          <p style={{ margin: 0, opacity: 0.7 }}>Manage your attractions</p>
        </div>

        {/* GRID CARDS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "15px"
        }}>
          {data.map((item) => (
            <div key={item.id} style={{
              background: "#1e293b",
              borderRadius: "12px",
              overflow: "hidden",
              color: "white"
            }}>

              <img
                src={item.coverimage}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover"
                }}
              />

              <div style={{ padding: "12px" }}>
                <h3 style={{ margin: "0 0 5px 0" }}>
                  {item.name}
                </h3>

                <p style={{ fontSize: "13px", opacity: 0.7 }}>
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

const btn = {
  padding: "10px",
  background: "#334155",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  textAlign: "left"
};