
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});
  const [typingUser, setTypingUser] = useState(null);

  const { socket, axios } = useContext(AuthContext);

  // ---------------- TYPING SOCKET ----------------

  useEffect(() => {

    if (!socket) return;

    socket.on("typing", (name) => {
      setTypingUser(name);
    });

    socket.on("stopTyping", () => {
      setTypingUser(null);
    });

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
    };

  }, [socket]);

  // ---------------- GET USERS ----------------

  const getUsers = async () => {
    try {

      const { data } = await axios.get("/api/messages/users");

      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages || {});
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  // ---------------- GET MESSAGES ----------------

  const getMessages = async (userId) => {
    try {

      const { data } = await axios.get(`/api/messages/${userId}`);

      if (data.success) {
        setMessages(data.messages);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  // ---------------- SEND MESSAGE ----------------

  const sendMessage = async (messageData) => {

    if (!selectedUser) return;

    try {

      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );

      if (data.success) {
        setMessages((prev) => [...prev, data.newMessage]);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  // ---------------- SOCKET SUBSCRIBE ----------------

  const subscribeToMessages = () => {

  if (!socket) return;

  socket.off("newMessage");

  socket.on("newMessage", (newMessage) => {

    const senderId = newMessage.senderId._id || newMessage.senderId;

    if (selectedUser && senderId === selectedUser._id) {

      newMessage.seen = true;

      setMessages((prev) => [...prev, newMessage]);

      axios.put(`/api/messages/mark/${newMessage._id}`);

    } 
    else {

      setUnseenMessages((prev) => ({
        ...prev,
        [senderId]: prev[senderId] ? prev[senderId] + 1 : 1,
      }));

    }

  });

};
  // ---------------- SOCKET UNSUBSCRIBE ----------------

  const unsubscribeFromMessages = () => {

    if (socket) {
      socket.off("newMessage");
    }

  };

  // ---------------- USE EFFECT ----------------

  useEffect(() => {

    subscribeToMessages();

    if (selectedUser) {

      setUnseenMessages((prev) => ({
        ...prev,
        [selectedUser._id]: 0,
      }));

      getMessages(selectedUser._id);

    }

    return () => unsubscribeFromMessages();

  }, [socket, selectedUser]);

  // ---------------- CONTEXT VALUE ----------------

  const value = {

    messages,
    typingUser,
    users,
    selectedUser,
    getUsers,
    getMessages,
    sendMessage,
    setMessages,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,

  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

