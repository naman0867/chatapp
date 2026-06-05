import React from "react";

const MessageInputForm = ({
  selectedUserId,
  newMessage,
  setNewMessage,
  sendMessage,
}) => {
  return (
    <>
      {!!selectedUserId && (
        <form
          onSubmit={sendMessage}
          className="relative m-4 w-full"
        >
          <input
            type="text"
            id="message-input"
            className="w-full px-4 py-3 rounded-xl bg-transparent border border-gray-600 text-white outline-none"
            placeholder="Your Message"
            value={newMessage}
            onChange={(ev) => setNewMessage(ev.target.value)}
            required
          />

          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 aspect-square h-10 font-medium text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L6 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      )}
    </>
  );
};

export default MessageInputForm;