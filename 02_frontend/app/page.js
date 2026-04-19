"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const api = process.env.NEXT_PUBLIC_API_HOST;

        const res = await fetch(`${api}/chickens`);

        if (!res.ok) throw new Error("API error");

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
      <header className="header">
        <h1>🐔 My Chicken Farm</h1>
        <p>จัดการข้อมูลไก่ของคุณ</p>
      </header>

      <div className="grid">
        {data.map((item) => (
          <Link href={`/chickens/${item.id}`} className="card" key={item.id}>
            <div className="image-wrapper">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="content">
              <h2>{item.name}</h2>
              <p>สายพันธุ์: {item.breed}</p>
              <small>
                น้ำหนัก: {item.weight} kg | อายุ: {item.age} เดือน
              </small>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}