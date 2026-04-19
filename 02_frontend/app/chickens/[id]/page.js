"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ChickenDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const api = process.env.NEXT_PUBLIC_API_HOST;

        const res = await fetch(`${api}/chickens/${id}`);

        if (!res.ok) throw new Error("Not found");

        const json = await res.json();

        setItem(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchDetail();
  }, [id]);

  if (loading) return <div className="center">⏳ Loading...</div>;
  if (error) return <div className="center error">❌ {error}</div>;
  if (!item) return <div className="center">No data</div>;

  return (
    <main className="container">
      <div className="card">
        <div className="image-wrapper">
          <img src={item.image} alt={item.name} />
        </div>

        <div className="content">
          <h1>{item.name}</h1>
          <p>🐔 สายพันธุ์: {item.breed}</p>
          <p>⚖️ น้ำหนัก: {item.weight} kg</p>
          <p>🎂 อายุ: {item.age} เดือน</p>
        </div>
      </div>
    </main>
  );
}