"use client";
import React, { useState } from "react";

const RecentlyUnfollowed = () => {
  const [unfollowedData, setUnfollowedData] = useState(null);
  const [recentlyUnfollowed, setRecentlyUnfollowed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError("");
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        setUnfollowedData(jsonData);
        processUnfollowedData(jsonData);
        setLoading(false);
      } catch (err) {
        setError("Error parsing recently unfollowed JSON file");
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  const processUnfollowedData = (data) => {
    if (!data || !data.relationships_unfollowed_users) {
      setError(
        "Invalid file format. Please upload the correct recently_unfollowed_profiles.json file"
      );
      return;
    }

    try {
      // Extract unfollowed users data with usernames, profile links, and timestamps
      const unfollowedUsers = data.relationships_unfollowed_users.map(
        (user) => ({
          username: user.string_list_data[0].value,
          profileUrl: user.string_list_data[0].href,
          timestamp: user.string_list_data[0].timestamp,
        })
      );

      // Sort by timestamp (most recent first)
      unfollowedUsers.sort((a, b) => b.timestamp - a.timestamp);

      setRecentlyUnfollowed(unfollowedUsers);
    } catch (err) {
      setError("Error processing data. Please check your JSON file format.");
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const unfollowDate = new Date(timestamp * 1000);
    const diffTime = Math.abs(now - unfollowDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div className="recently-unfollowed-wrapper">
      <div className="file-upload">
        <div className="upload-section">
          <label>
            <span className="label-text">
              📁 Upload Recently Unfollowed JSON:
            </span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              disabled={loading}
            />
          </label>
          {unfollowedData && <span className="file-status">✅ Loaded</span>}
        </div>

        {error && <div className="error-message">❌ {error}</div>}
      </div>

      {recentlyUnfollowed.length > 0 && (
        <div className="results-section">
          <h1>🚫 Recently Unfollowed Users</h1>
          <h2>
            {recentlyUnfollowed.length} user
            {recentlyUnfollowed.length !== 1 ? "s" : ""} unfollowed
          </h2>

          <div className="users-grid">
            {recentlyUnfollowed.map((user, index) => (
              <div key={index} className="user-card unfollowed-card">
                <div className="user-info">
                  <span className="username">@{user.username}</span>
                  <span className="unfollow-date">
                    Unfollowed: {formatDate(user.timestamp)}
                  </span>
                  <span className="time-ago">{getTimeAgo(user.timestamp)}</span>
                </div>
                <div className="user-actions">
                  <a
                    href={user.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="profile-link"
                  >
                    📱 View Profile
                  </a>
                  <button
                    onClick={() => window.open(user.profileUrl, "_blank")}
                    className="refollow-btn"
                  >
                    ➕ Re-follow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="loading-message">🔄 Processing your data...</div>
      )}

      {unfollowedData && recentlyUnfollowed.length === 0 && !loading && (
        <div className="no-data-message">
          🎉 Great! You haven't unfollowed anyone recently.
        </div>
      )}
    </div>
  );
};

export default RecentlyUnfollowed;
