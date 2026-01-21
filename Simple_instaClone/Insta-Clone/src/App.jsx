import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Suggestion from "./Suggestion";
import Profile from "./Profile";

function App() {
  const [profile, setProfile] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, followersRes, suggestionsRes] = await Promise.all([
          axios.get("http://localhost:3001/profile"),
          axios.get("http://localhost:3001/followers"),
          axios.get("http://localhost:3001/suggestions"),
        ]);

        setProfile(profileRes.data);
        setFollowers(followersRes.data);
        setSuggestions(suggestionsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFollowToggle = async (user) => {
    const isFollowing = followers.some(f => f.id === user.id);

    try {
      if (isFollowing) {
        await axios.delete(`http://localhost:3001/followers/${user.id}`);
        setFollowers(prev => prev.filter(f => f.id !== user.id));
      } else {
        await axios.post("http://localhost:3001/followers", user);
        setFollowers(prev => [...prev, user]);
      }
    } catch (error) {
      console.error("Follow toggle error:", error);
    }
  };

  if (loading) return <p className="m-4">Loading...</p>;

  return (
    <div className="app d-flex flex-column flex-lg-row vh-100">
      <div className="sidebar-wrapper">
        <Sidebar profile={profile} followers={followers} />
      </div>

      <div className="feed-wrapper flex-grow-1">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route
            path="/profile"
            element={
              <Profile
                profile={profile}
                followers={followers}
                setProfile={setProfile}
                handleFollowToggle={handleFollowToggle}
              />
            }
          />
        </Routes>
      </div>

      <div className="suggestion-wrapper d-none d-lg-block">
        <Suggestion
          profile={profile}
          suggestions={suggestions}
          followers={followers}
          handleFollowToggle={handleFollowToggle}
        />
      </div>
    </div>
  );
}

export default App;
