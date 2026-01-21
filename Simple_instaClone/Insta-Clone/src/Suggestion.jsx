import React from "react";

export default function Suggestion({ profile, suggestions, followers, handleFollowToggle, onProfileClick }) {
  const handleSwitch = () => alert("Switch account logic here");

  return (
    <div className="suggestions m-4 p-3 border rounded shadow-sm bg-white">
      {/* Profile Header */}
      <div className="d-flex align-items-center mb-3 cursor-pointer" onClick={() => onProfileClick(profile)}>
        <img
          src={profile.profilePicture || "/default-profile.png"}
          alt={profile.name}
          className="dp rounded-circle"
        />
        <div className="ms-2">
          <h6 className="mb-0">{profile.name}</h6>
          <small className="text-muted">{profile.username || ""}</small>
        </div>
        <small
          className="ms-auto text-primary fw-semibold cursor-pointer"
          onClick={handleSwitch}
        >
          Switch
        </small>
      </div>

      {/* Suggestions Header */}
      <div className="d-flex mb-2">
        <p className="text-muted mb-0">Suggested for you</p>
        <p className="ms-auto fw-semibold cursor-pointer">See All</p>
      </div>

      {/* Suggestions List */}
      {suggestions.map(user => {
        const isFollowing = followers.some(f => f.id === user.id);

        return (
          <div key={user.id} className="d-flex align-items-center my-2">
            <img
              src={user.profilePicture || "/default-profile.png"}
              alt={user.name}
              className="dp rounded-circle"
            />
            <div className="ms-2">
              <h6 className="mb-0">{user.name}</h6>
              <small className="text-muted">Suggested for you</small>
            </div>

            <button
              className={`btn btn-sm ms-auto ${
                isFollowing ? "btn-outline-secondary" : "btn-primary"
              }`}
              onClick={() => handleFollowToggle(user)}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
