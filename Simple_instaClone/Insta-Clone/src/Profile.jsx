import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Profile({ profile, followers, setProfile, handleFollowToggle }) {
  const location = useLocation();

  // Use state from location or fallback to props
  const initialProfile = location.state?.profile || profile || null;
  const initialFollowers = location.state?.followers || followers || [];

  const [profileState, setProfileState] = useState(initialProfile);
  const [followersState, setFollowersState] = useState(initialFollowers);
  const [editing, setEditing] = useState(false);

  // Sync with parent props if they change
  useEffect(() => {
    if (profile) setProfileState(profile);
  }, [profile]);

  useEffect(() => {
    if (followers) setFollowersState(followers);
  }, [followers]);

  if (!profileState) return <p className="text-center mt-3">Profile not found.</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileState(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await fetch("http://localhost:3001/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileState),
      });
      alert("Profile updated!");
      setEditing(false);
      if (setProfile) setProfile(profileState); // Update parent
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Failed to update profile.");
    }
  };

  const handleFollowToggleState = (user) => {
    if (handleFollowToggle) handleFollowToggle(user); // Update parent state
  };

  return (
    <div className="profile-container m-4 p-3 border rounded shadow-sm bg-white">
      <div className="d-flex align-items-center mb-3">
        <img
          src={profileState.profilePicture || "/default-profile.png"}
          alt="profile"
          className="profile rounded-circle"
        />
        <div className="ms-3">
          <h6 className="mb-0">{profileState.name}</h6>
          <small className="text-muted">{profileState.username || ""}</small>
        </div>
        <button
          className="btn btn-outline-primary btn-sm ms-auto"
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      {editing && (
        <div className="mb-3">
          <input
            type="text"
            name="name"
            value={profileState.name}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Name"
          />
          <input
            type="text"
            name="profilePicture"
            value={profileState.profilePicture}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Profile Picture URL"
          />
          <button className="btn btn-primary" onClick={handleUpdate}>
            Save Profile
          </button>
        </div>
      )}

      <hr />
      <h6>Followers ({followersState.length})</h6>

      {followersState.length > 0 ? (
        followersState.map(f => (
          <div key={f.id} className="d-flex align-items-center mb-2">
            <img
              src={f.profilePicture || "/default-profile.png"}
              alt={f.name}
              className="dp rounded-circle"
            />
            <span className="ms-2">{f.name}</span>
            <button
              className="btn btn-sm btn-outline-danger ms-auto"
              onClick={() => handleFollowToggleState(f)}
            >
              Unfollow
            </button>
          </div>
        ))
      ) : (
        <div className="text-muted">No followers yet</div>
      )}
    </div>
  );
}

export default Profile;
