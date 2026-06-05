import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectAvatar = ({ setSelectedLink, selectedLink }) => {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await axios.get("/api/avatar/all");

        console.log(response.data.avatars);
        setAvatars(response.data.avatars);
      } catch (error) {
        console.error("Error fetching avatars:", error);
      }
    };

    fetchAvatars();
  }, []);

  return (
    <div className="mt-3">
      <p className="block mb-2 text-lg font-medium text-white">
        Choose Avatar
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
        {avatars?.map((avatar) => (
          <div
            key={avatar._id}
            className={`flex justify-center items-center rounded-full p-2 cursor-pointer transition-all ${
              selectedLink === avatar.link
                ? "ring-4 ring-blue-500 bg-primary"
                : "bg-primary hover:ring-2 hover:ring-gray-400"
            }`}
            onClick={() => setSelectedLink(avatar.link)}
          >
            <img
              src={avatar.link}
              alt={`Avatar ${avatar._id}`}
              className="w-[90px] h-[90px] rounded-full object-cover"
            />
          </div>
        ))}
      </div>

      {selectedLink && (
        <div className="mt-4">
          <p className="text-white mb-2">Selected Avatar:</p>

          <img
            src={selectedLink}
            alt="Selected Avatar"
            className="w-24 h-24 rounded-full border-2 border-blue-500 object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default SelectAvatar;