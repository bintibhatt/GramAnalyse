"use client";
import React, { useState } from "react";

function FNFCompare() {
  const [followersData, setFollowersData] = useState(null);
  const [followingData, setFollowingData] = useState(null);
  const [notFollowing, setNotFollowing] = useState([]);

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const jsonData = JSON.parse(event.target.result);
      if (type === "followers") {
        setFollowersData(jsonData);
      } else if (type === "following") {
        setFollowingData(jsonData);
      }
    };
    reader.readAsText(file);
  };

  const compareFollowersAndFollowing = () => {
    if (!followersData || !followingData) return;

    const followersArr = followersData.map(
      (f) => f.string_list_data[0].value
    );
    const followingArr = followingData.relationships_following.map(
      (f) => f.title
    );

    const notFollowingYouBack = followingArr.filter(
      (user) => !followersArr.includes(user)
    );

    setNotFollowing(notFollowingYouBack);
  };

  return (
    <div>
      <header className="header">
        <div className="header-container">
          <h1 className="logo">PEOPLE NOT FOLLOWING BACK</h1>
        </div>
      </header>

      <div className="file-upload">
        <label>
          Upload Followers JSON:
          <input
            type="file"
            accept=".json"
            onChange={(e) => handleFileUpload(e, "followers")}
          />
        </label>

        <label>
          Upload Following JSON:
          <input
            type="file"
            accept=".json"
            onChange={(e) => handleFileUpload(e, "following")}
          />
        </label>

        <button onClick={compareFollowersAndFollowing}>Compare</button>
      </div>

      {notFollowing.length > 0 && (
        <div>
          <h1>Not following you back</h1>
          <h2>{notFollowing.length}</h2>
          <ul>
            {notFollowing.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FNFCompare;
