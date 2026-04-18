"use client";

export default function BatchesPage() {
  return (
    <div className="layout">
      <Sidebar />

      <main className="main">
        <h1>Batch Management</h1>
        <p>Orchestrate your poultry cycles...</p>

        {/* TOP STATS */}
        <div className="stats">
          <div className="card">Active Batches</div>
          <div className="card">Total Population</div>
        </div>

        {/* TABLE */}
        <div className="table">
          <h3>Batch List</h3>
        </div>

        {/* BOTTOM CARDS */}
        <div className="bottom">
          <div className="card">Genetic Trends</div>
          <div className="card">Prediction</div>
        </div>
      </main>
    </div>
  );
}