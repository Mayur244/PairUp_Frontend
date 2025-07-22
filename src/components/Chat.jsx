import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createSocketConnection } from "../utils/socket";
import { getSecretRoomId } from "../utils/getSecretRoomId";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { setMessageHistory, addMessage } from "../utils/chatSlice";

const Chat = () => {
  const socketRef = useRef();
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);

  const { targetUserId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);

  const userId = user?._id;
  const firstName = user?.firstName;

  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current) return;
    socketRef.current.emit("sendMessage", {
      firstName,
      userId,
      targetUserId,
      textMessage: newMessage,
    });
    setNewMessage("");
  };

  useEffect(() => {
    if (!userId || !targetUserId) return;
    socketRef.current = createSocketConnection();
    const socket = socketRef.current;
    const roomId = getSecretRoomId(userId, targetUserId);
    socket.emit("joinChat", { firstName, userId, targetUserId });
    socket.on("messageReceived", (newMessageObj) => {
      dispatch(addMessage(newMessageObj));
    });

    const getMessageHistory = async () => {
      const res = await axios.get(`${BASE_URL}/chat/${roomId}/messages`, {
        withCredentials: true,
      });
      dispatch(setMessageHistory(res.data || []));
    };
    getMessageHistory();

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [messages]);

  function formatTime(iso) {
    const dt = new Date(iso);
    let h = dt.getHours();
    const m = dt.getMinutes().toString().padStart(2, "0");
    const a = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${m} ${a}`;
  }

  return (
    <div className="w-full flex items-center justify-center bg-base-200 py-8 px-2">
      <div className="max-w-xl w-full border border-gray-600 max-h-[80vh] flex flex-col bg-base-200 rounded-lg shadow-lg overflow-hidden mt-10">
        <h1 className="p-5 border-b border-gray-600 text-center font-bold text-lg">
          Chat
        </h1>
        <div className="flex-1 overflow-y-auto p-5">
          {(messages || []).map((msg, index) => {
            const isMe =
              msg.from === userId ||
              msg.from?._id === userId ||
              msg.from?.toString() === userId;

            return (
              <div
                key={msg._id || index}
                className={isMe ? "chat chat-end" : "chat chat-start"}
              >
                <div
                  className={
                    "chat-bubble " +
                    (isMe
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-white")
                  }
                >
                  {msg?.message}
                </div>
                <div className="chat-header">
                  {msg?.firstName}
                  <span
                    style={{ marginLeft: 8, fontSize: 12, color: "gray" }}
                  >
                    {formatTime(msg.createdAt)}
                  </span>
                </div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-5 border-t border-gray-600 flex items-center gap-2 bg-base-300">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border border-gray-500 text-white rounded p-2 bg-base-100"
            placeholder="Message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button onClick={sendMessage} className="btn btn-secondary">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
