import React, { useEffect, useState } from "react";
import axios from "axios";

import Nav from "../Chat/Nav";
import SelectAvatar from "./SelectAvatar";

import { useProfile } from "../Context/profileContext";

const Profile = () => {
  const { userDetails, setUserDetails } = useProfile();

  const [username, setUsername] = useState("");
  const [selectedLink, setSelectedLink] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setUsername(userDetails.username || "");
      setSelectedLink(userDetails.avatarLink || "");
    }
  }, [userDetails]);

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.put("/api/user/profile", {
        username,
        avatarLink: selectedLink,
      });

      if (setUserDetails) {
        setUserDetails(data);
      }

      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Nav />

      <div className="flex-1 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">
            Profile Settings
          </h1>

          <form onSubmit={updateProfile}>
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="Enter username"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Select Avatar
              </label>

              <SelectAvatar
                selectedLink={selectedLink}
                setSelectedLink={setSelectedLink}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;