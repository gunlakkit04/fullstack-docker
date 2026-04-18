"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const api = process.env.NEXT_PUBLIC_API_HOST;

        if (!api) {
          throw new Error("API URL not found in env");
        }

        const res = await fetch(`${api}/attractions`);

        if (!res.ok) {
          throw new Error("API error: " + res.status);
        }

        const json = await res.json();

        setData(json.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="center">⏳ Loading...</div>;
  if (error) return <div className="center error">❌ {error}</div>;

  return (
    <main className="container">
      <h1>🌍 Attractions</h1>

      <div className="grid">
        {data.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.coverimage} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.detail}</p>
          </div>
        ))}
      </div>
    </main>
  );
}