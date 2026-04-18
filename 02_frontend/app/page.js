"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API_HOST;

    fetch(`${api}/attractions`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>🌍 Attractions</h1>

      <div style={{ display: "grid", gap: 15 }}>
        {data.map((item) => (
          <div key={item.id} style={{ border: "1px solid #ccc", padding: 10 }}>
            <img src={item.coverimage} width="100%" />
            <h3>{item.name}</h3>
            <p>{item.detail}</p>
            <small>{item.latitude}, {item.longitude}</small>
          </div>
        ))}
      </div>
    </div>
  );
} 