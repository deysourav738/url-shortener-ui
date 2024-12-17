import React from "react";
import ShortenUrl from "./components/ShortenUrl";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>🚀 URL Shortener & Analytics</h1>
      <div className="card">
        <ShortenUrl />
      </div>
      <div className="card">
        <AnalyticsDashboard />
      </div>
    </div>
  );
}

export default App;
