const API_URL = process.env.REACT_APP_API_URL;

// Shorten URL
export const shortenUrl = async (longUrl) => {
    const response = await fetch(`${API_URL}/shorten`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl }),
    });
    if (!response.ok) {
        throw new Error("Failed to shorten URL");
    }
    return await response.json();
};

// Fetch analytics for a short URL
export const getAnalytics = async (shortUrl) => {
    const response = await fetch(`${API_URL}/analytics/${shortUrl}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch analytics");
    }
    return await response.json();
};
