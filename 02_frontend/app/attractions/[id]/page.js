"use client";

import { useEffect, useState } from "react";

export default function DetailPage({ params }) {
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const api = process.env.NEXT_PUBLIC_API_HOST;

        const res = await fetch(`${api}/attractions/${params.id}`);

        const json = await res.json();
        console.log("API RESULT:", json);

        if (!json.data) {
          setError("No data found");
          return;
        }

        setItem(json.data);

      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, [params.id]);

  if (error) return <div className="center error">❌ {error}</div>;
  if (!item) return <div className="center">Loading...</div>;

  return (
    <div className="container">
      <h1>{item.name}</h1>

      <img
        src={item.coverimage}
        style={{ width: "100%", borderRadius: "12px" }}
      />

      <p>{item.detail}</p>
      <p>📍 {item.latitude}, {item.longitude}</p>
    </div>
  );
}