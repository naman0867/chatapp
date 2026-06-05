import React, { useEffect, useRef } from "react";

const ChatMessages = ({
  messages,
  userDetails,
  selectedUserId,
}) => {
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const container = messagesContainerRef.current;

    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      ref={messagesContainerRef}
      className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full px-7 lg:px-20 overflow-y-auto"
    >
      {!!selectedUserId && (
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`text-white relative group rounded-b-2xl px-5 py-3 ${
                message.sender !== userDetails._id
                  ? "bg-primary self-start rounded-r-2xl"
                  : "bg-primarySecond self-end rounded-l-2xl"
              }`}
            >
              <div
                style={{ wordBreak: "break-word" }}
                className="flex flex-wrap max-w-[500px] overflow-hidden"
              >
                {message.text}
              </div>

              <div
                className={`absolute top-0 w-0 h-0 border-b-[20px] border-b-transparent ${
                  message.sender !== userDetails._id
                    ? "border-r-primary -left-4 border-r-[20px]"
                    : "border-l-primarySecond -right-4 border-l-[20px]"
                }`}
              />
            </div>
          ))}
        </div>
      )}

      {selectedUserId && messages.length === 0 && (
        <div className="text-gray-500 flex items-end justify-center h-full">
          Start a conversation
        </div>
      )}
    </div>
  );
};

export default ChatMessages;