"use client";
import React, { useState } from "react";

const NotFollowingBack = () => {
  const [followersData, setFollowersData] = useState(null);
  const [followingData, setFollowingData] = useState(null);
  const [notFollowing, setNotFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setError("");
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        if (type === "followers") {
          setFollowersData(jsonData);
        } else if (type === "following") {
          setFollowingData(jsonData);
        }
        setLoading(false);
      } catch (err) {
        setError(`Error parsing ${type} JSON file`);
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  const compareFollowersAndFollowing = () => {
    if (!followersData || !followingData) {
      setError("Please upload both followers and following JSON files");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Extract followers usernames
      const followersArr = followersData.map(
        (f) => f.string_list_data[0].value
      );

      // Extract following data with usernames and profile links
      const followingArr = followingData.relationships_following.map((f) => ({
        username: f.string_list_data[0].value,
        profileUrl: f.string_list_data[0].href,
        timestamp: f.string_list_data[0].timestamp,
      }));

      // Find users who are not following back
      const notFollowingYouBack = followingArr.filter(
        (user) => !followersArr.includes(user.username)
      );

      // Sort by timestamp (most recent first)
      notFollowingYouBack.sort((a, b) => b.timestamp - a.timestamp);

      setNotFollowing(notFollowingYouBack);
      setLoading(false);
    } catch (err) {
      setError("Error processing data. Please check your JSON file formats.");
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <div className="not-following-back-wrapper">
      <div className="file-upload">
        <div className="upload-section">
          <label>
            <span className="label-text">📁 Upload Followers JSON:</span>
            <input
              type="file"
              accept=".json"
              onChange={(e) => handleFileUpload(e, "followers")}
              disabled={loading}
            />
          </label>
          {followersData && <span className="file-status">✅ Loaded</span>}
        </div>

        <div className="upload-section">
          <label>
            <span className="label-text">📁 Upload Following JSON:</span>
            <input
              type="file"
              accept=".json"
              onChange={(e) => handleFileUpload(e, "following")}
              disabled={loading}
            />
          </label>
          {followingData && <span className="file-status">✅ Loaded</span>}
        </div>

        <button
          onClick={compareFollowersAndFollowing}
          disabled={loading || !followersData || !followingData}
          className="compare-btn"
        >
          {loading ? "Processing..." : "🔍 Find Non-Followers"}
        </button>

        {error && <div className="error-message">❌ {error}</div>}
      </div>

      {notFollowing.length > 0 && (
        <div className="results-section">
          <h1>👥 Not Following You Back</h1>
          <h2>
            {notFollowing.length} user{notFollowing.length !== 1 ? "s" : ""}
          </h2>

          <div className="users-grid">
            {notFollowing.map((user, index) => (
              <div key={index} className="user-card">
                <div className="user-info">
                  <span className="username">@{user.username}</span>
                  <span className="follow-date">
                    Followed: {formatDate(user.timestamp)}
                  </span>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotFollowingBack;
