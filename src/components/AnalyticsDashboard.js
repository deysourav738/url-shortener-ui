import React, { useState } from "react";
import { getAnalytics } from "../services/api";

const AnalyticsDashboard = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState(null);

  const fetchAnalytics = async () => {
    if (!shortUrl.trim()) {
      setError("Please enter a URL for analytics.");
      return;
    }

    try {
      // Extract the last part of the URL (short key)
      const url = new URL(shortUrl);
      const shortKey = url.pathname.substring(1);
      const data = await getAnalytics(shortKey);

      // Transform Maps to Arrays
      const geoDataArray = Object.entries(data.geoData || {}).map(([country, count]) => ({
        country,
        count,
      }));
      const referrersArray = Object.entries(data.referrers || {}).map(([referrer, count]) => ({
        referrer,
        count,
      }));

      setAnalytics({
        clicks: data.clicks,
        geoData: geoDataArray,
        referrers: referrersArray,
      });

      setError(null);
    } catch (err) {
      setError("Failed to fetch analytics");
      console.error(err);
    }
  };

  return (
    <div className="analytics-container">
      <h2>📊 URL Analytics</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter Short URL here..."
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
        />
        <button onClick={fetchAnalytics}>Get Analytics</button>
      </div>

      {error && <p className="error">{error}</p>}

      {analytics && (
        <div className="analytics-results">
          <h3>Total Clicks: {analytics.clicks}</h3>

          {/* Geographic Data */}
          <h4>🌎 Geographic Data</h4>
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Country</th>
                <th>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {analytics.geoData.map((geo, index) => (
                <tr key={index}>
                  <td>{geo.country}</td>
                  <td>{geo.count}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Referrer Data */}
          <h4>🔗 Referrer Data</h4>
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Referrer</th>
                <th>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {analytics.referrers.map((referrer, index) => (
                <tr key={index}>
                  <td>{referrer.referrer}</td>
                  <td>{referrer.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
