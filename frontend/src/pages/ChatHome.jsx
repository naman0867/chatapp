import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useProfile } from "../Context/profileContext";
import { useAuth } from "../Context/authContext";

import ChatMessages from "../Chat/ChatMessages";
import MessageInputForm from "../Chat/MessageInputForm";
import Nav from "../Chat/Nav";
import OnlineUsersList from "../Chat/OnlineUserList";
import TopBar from "../Chat/TopBar";

import { socketUrl } from "../../apiConfig";

const ChatHome = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { userDetails } = useProfile();
  const { isAuthenticated, checkAuth } = useAuth();

  const navigate = useNavigate();

  const showOnlinePeople = (peopleArray) => {
    const people = {};

    peopleArray.forEach(({ userId, username, avatarLink }) => {
      if (userId !== userDetails?._id) {
        people[userId] = {
          username,
          avatarLink,
        };
      }
    });

    setOnlinePeople(people);
  };

  const handleMessage = (event) => {
    const messageData = JSON.parse(event.data);

    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    }

    if ("text" in messageData) {
      setMessages((prev) => [...prev, messageData]);
    }
  };

  const connectToWebSocket = () => {
    const socket = new WebSocket(socketUrl);

    socket.addEventListener("message", handleMessage);

    socket.addEventListener("close", () => {
      setTimeout(() => {
        connectToWebSocket();
      }, 1000);
    });

    setWs(socket);
  };

  useEffect(() => {
    connectToWebSocket();

    return () => {
      ws?.close();
    };
  }, []);

  useEffect(() => {
    if (!selectedUserId) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `/api/user/messages/${selectedUserId}`
        );

        setMessages(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [selectedUserId]);

  useEffect(() => {
    if (!userDetails?._id) return;

    axios
      .get("/api/user/people")
      .then((res) => {
        const offlinePeopleArr = res.data
          .filter((p) => p._id !== userDetails._id)
          .filter((p) => !onlinePeople[p._id]);

        const offlineMap = {};

        offlinePeopleArr.forEach((person) => {
          offlineMap[person._id] = person;
        });

        setOfflinePeople(offlineMap);
      })
      .catch((err) => console.error(err));
  }, [onlinePeople, userDetails]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;
    if (!selectedUserId) return;
    if (!ws) return;

    ws.send(
      JSON.stringify({
        text: newMessage,
        recipient: selectedUserId,
      })
    );

    setMessages((prev) => [
      ...prev,
      {
        _id: Date.now(),
        text: newMessage,
        sender: userDetails?._id,
        recipient: selectedUserId,
      },
    ]);

    setNewMessage("");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen bg-background">
      <Nav />

      <OnlineUsersList
        onlinePeople={onlinePeople}
        offlinePeople={offlinePeople}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />

      <section className="w-[71%] lg:w-[62%] relative pb-20">
        {selectedUserId && (
          <TopBar
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            offlinePeople={offlinePeople}
            onlinePeople={onlinePeople}
          />
        )}

        <ChatMessages
          messages={messages}
          userDetails={userDetails}
          selectedUserId={selectedUserId}
        />

        <div className="absolute bottom-0 left-0 w-full">
          <MessageInputForm
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
            selectedUserId={selectedUserId}
          />
        </div>
      </section>
    </div>
  );
};

export default ChatHome;