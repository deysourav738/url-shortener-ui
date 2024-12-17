import React, { useState } from "react";
import { shortenUrl } from "../services/api";
import { FiLink, FiCopy } from "react-icons/fi"; // Icons for visual enhancement

const ShortenUrl = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;


  const handleShorten = async () => {
    if (!longUrl.trim()) { 
        setError("Please enter a valid URL before shortening.");
        setShortUrl(null);
        return;
      }
    try {
      const response = await shortenUrl(longUrl);
      setShortUrl(response.shortUrl);
      setError(null);
    } catch (err) {
      setError("Failed to generate short URL");
      console.error(err);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(API_URL + "/" + shortUrl);
    alert("Short URL copied to clipboard!");
  };

  return (
    <div className="shorten-container">
      <h2>🔗 Shorten Your URL</h2>
      <div className="input-group">
        <FiLink size={20} />
        <input
          type="text"
          placeholder="Enter Long URL here..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button onClick={handleShorten}>Shorten</button>
      </div>

      {shortUrl && (
        <div className="result">
          <p>
            Your Short URL:{" "}
            <a
              href={`${API_URL}/${shortUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              {API_URL+"/"+shortUrl}
            </a>
          </p>
          <button onClick={copyToClipboard}>
            <FiCopy /> Copy
          </button>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ShortenUrl;
