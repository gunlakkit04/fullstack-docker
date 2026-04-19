"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const api = process.env.NEXT_PUBLIC_API_HOST;

        const res = await fetch(`${api}/chickens`);
        const json = await res.json();

        setData(json.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <main className="container">
      <h1>🐔 Chicken Farm</h1>

      <div className="grid">
        {data.map((item) => (
          <Link key={item.id} href={`/chickens/${item.id}`} className="card">
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>{item.breed}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}