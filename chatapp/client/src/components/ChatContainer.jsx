import React, { useEffect, useRef, useContext, useState } from "react";
import assets from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const ChatContainer = () => {

  const { selectedUser, setSelectedUser, sendMessage, messages, typingUser } =
    useContext(ChatContext);

  const { authUser, socket } = useContext(AuthContext);

  const [input, setInput] = useState("");
  const scrollEnd = useRef();

  // auto scroll
  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // send text message
  const handleSendMessage = async () => {

    if (input.trim() === "") return;

    await sendMessage({
      text: input,
      receiverId: selectedUser._id
    });

    socket.emit("stopTyping", {
      receiverId: selectedUser._id
    });

    setInput("");
  };

  // send image
  const handleSendImage = async (e) => {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {

      await sendMessage({
        image: reader.result,
        receiverId: selectedUser._id
      });

      e.target.value = "";
    };
  };

  if (!selectedUser) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
        <img src={assets.logo_icon} className="max-w-16" alt="" />
        <p className="text-lg font-medium text-white">
          Chat anytime , anywhere
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">

      {/* Header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">

        <img
          src={selectedUser?.profilepic || assets.avatar_icon}
          alt=""
          className="w-8 rounded-full"
        />

        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </p>

        <img
          onClick={() => setSelectedUser(null)}
          src={assets.right_arrow_icon}
          alt=""
          className="md:hidden max-w-7 cursor-pointer"
        />

        <img
          src={assets.help_icon}
          alt=""
          className="max-md:hidden max-w-5"
        />

      </div>

      {/* Messages */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">

        {messages
          .filter(
            (msg) =>
              msg.senderId === selectedUser._id ||
              msg.receiverId === selectedUser._id
          )
          .map((msg, index) => (

            <div
              key={index}
              className={`flex items-end gap-2 ${msg.senderId === authUser?._id
                  ? "justify-end"
                  : "flex-row-reverse"
                }`}
            >

              {msg.image ? (
                <img
                  src={msg.image}
                  alt=""
                  className="max-w-[230px] border border-gray-700 rounded-lg mb-8"
                />
              ) : (
                <p
                  className={`p-2 max-w-[200px] md:text-sm font-light
                rounded-lg mb-2 break-all text-white
                ${msg.senderId === authUser?._id
                      ? "bg-violet-500/30 rounded-br-none"
                      : "bg-gray-600 rounded-bl-none"
                    }`}
                >
                  {msg.text}
                </p>
              )}

              <div className="text-center text-xs">

                <img
                  src={
                    msg.senderId === authUser?._id
                      ? authUser.profilepic || assets.avatar_icon
                      : selectedUser.profilepic || assets.avatar_icon
                  }
                  alt=""
                  className="w-7 rounded-full"
                />

                <p className="text-gray-500 text-[10px]">
                  {formatMessageTime(msg.createdAt)}
                </p>

                {/* Blue Tick */}
                {msg.senderId === authUser?._id && (
                  <span
                    className={`text-xs ${msg.seen ? "text-blue-500" : "text-gray-400"
                      }`}
                  >
                    {msg.seen ? "✔✔" : "✔"}
                  </span>
                )}

              </div>

            </div>

          ))}

        {/* Typing Indicator */}
        {typingUser && (
          <p className="text-gray-400 text-sm px-3">
            {typingUser} is typing...
          </p>
        )}

        <div ref={scrollEnd}></div>

      </div>

      {/* Input */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">

        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">

          <input
            type="text"
            value={input}
            onChange={(e) => {

              setInput(e.target.value);

              socket.emit("typing", {
                receiverId: selectedUser._id,
                senderName: authUser.fullName
              });

            }}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Send a message"
            className="flex-1 text-sm p-3 border-none outline-none text-white bg-transparent placeholder-gray-400"
          />

          <input
            type="file"
            id="image"
            accept="image/png,image/jpeg"
            hidden
            onChange={handleSendImage}
          />

          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt=""
              className="w-5 mr-2 cursor-pointer"
            />
          </label>

        </div>

        <img
          onClick={handleSendMessage}
          src={assets.send_button}
          alt=""
          className="w-7 cursor-pointer"
        />

      </div>

    </div>
  );
};

export default ChatContainer;