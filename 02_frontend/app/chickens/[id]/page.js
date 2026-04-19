"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function load() {
      const api = process.env.NEXT_PUBLIC_API_HOST;
      const res = await fetch(`${api}/chickens/${id}`);
      const json = await res.json();
      setItem(json.data);
    }

    if (id) load();
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <main className="container">
      <div className="card">
        <img src={item.image} />
        <h1>{item.name}</h1>
        <p>Breed: {item.breed}</p>
        <p>Weight: {item.weight}</p>
        <p>Age: {item.age}</p>
      </div>
    </main>
  );
}