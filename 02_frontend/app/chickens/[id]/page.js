"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const api = process.env.NEXT_PUBLIC_API_HOST;

        const res = await fetch(`${api}/chickens/${id}`);
        const json = await res.json();

        setItem(json.data || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) load();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!item) return <p>No data</p>;

  return (
    <main className="container">
      <div className="card">
        <img src={item.image} alt={item.name} />
        <h1>{item.name}</h1>
        <p>Breed: {item.breed}</p>
        <p>Weight: {item.weight}</p>
        <p>Age: {item.age}</p>
      </div>
    </main>
  );
}