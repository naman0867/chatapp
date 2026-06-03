const ws = require("ws");
const jwt = require("jsonwebtoken");

const Message = require("./models/messageModel");
const { User } = require("./models/userModel");

const createWebSocketServer = (server) => {
  const wss = new ws.WebSocketServer({ server });

  wss.on("connection", (connection, req) => {
    const notifyAboutOnlinePeople = async () => {
      const onlineUsers = await Promise.all(
        [...wss.clients].map(async (client) => {
          let avatarLink = null;

          if (client.userId) {
            const user = await User.findById(client.userId);
            avatarLink = user?.avatarLink || null;
          }

          return {
            userId: client.userId,
            username: client.username,
            avatarLink,
          };
        })
      );

      [...wss.clients].forEach((client) => {
        client.send(
          JSON.stringify({
            online: onlineUsers,
          })
        );
      });
    };

    connection.isAlive = true;

    connection.timer = setInterval(() => {
      connection.ping();

      connection.deathTimer = setTimeout(() => {
        clearInterval(connection.timer);
        connection.terminate();
        notifyAboutOnlinePeople();
      }, 1000);
    }, 5000);

    connection.on("pong", () => {
      clearTimeout(connection.deathTimer);
    });

    const cookies = req.headers.cookie;

    if (cookies) {
      const tokenString = cookies
        .split(";")
        .find((str) => str.trim().startsWith("authToken="));

      if (tokenString) {
        const token = tokenString.split("=")[1];

        jwt.verify(
          token,
          process.env.JWTPRIVATEKEY,
          {},
          (err, userData) => {
            if (err) {
              console.error(err);
              return;
            }

            const { _id, firstName, lastName } = userData;

            connection.userId = _id;
            connection.username = `${firstName} ${lastName}`;
          }
        );
      }
    }

    connection.on("message", async (message) => {
      try {
        const messageData = JSON.parse(message.toString());

        const { recipient, text } = messageData;

        if (!recipient || !text) return;

        const msgDoc = await Message.create({
          sender: connection.userId,
          recipient,
          text,
        });

        [...wss.clients].forEach((client) => {
          if (client.userId === recipient) {
            client.send(
              JSON.stringify({
                _id: msgDoc._id,
                sender: connection.userId,
                recipient,
                text,
              })
            );
          }
        });
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    });

    notifyAboutOnlinePeople();
  });
};

module.exports = createWebSocketServer;