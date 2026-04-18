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

        const res = await fetch(`${api}/attractions`);
        const json = await res.json();

        setData(json.data);
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
      <header className="header">
        <h1>🌍 Attractions</h1>
        <p>Beautiful places around the world</p>
      </header>

      <div className="grid">
        {data.map((item) => (
          <div className="card" key={item.id}>
            
            <div className="image-wrapper">
              <img src={item.coverimage} alt={item.name} />
            </div>

            <div className="content">
              <h2>{item.name}</h2>
              <p>{item.detail}</p>
              <small>
                📍 {item.latitude}, {item.longitude}
              </small>
            </div>

          </div>
        ))}
      </div>
    </main>
  );
}