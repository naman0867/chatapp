import React from "react";

const TopBar = ({
  setSelectedUserId,
  selectedUserId,
  offlinePeople,
  onlinePeople,
}) => {
  return (
    <div className="absolute right-0 top-0 text-white w-full py-5 px-4 bg-background border-b border-gray-700 flex items-center gap-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 cursor-pointer"
        onClick={() => setSelectedUserId(null)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>

      {selectedUserId && (
        <>
          {onlinePeople[selectedUserId] ? (
            <>
              <span>
                {onlinePeople[selectedUserId].username}
              </span>

              <span className="h-3 w-3 rounded-full bg-green-500" />
            </>
          ) : (
            <>
              <span>
                {offlinePeople[selectedUserId]?.firstName}{" "}
                {offlinePeople[selectedUserId]?.lastName}
              </span>

              <span className="h-3 w-3 rounded-full bg-gray-500" />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TopBar;