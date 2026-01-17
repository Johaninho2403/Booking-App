import React, { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import { toast } from "react-toastify";
import axios from "../lib/axios";

const Chat = (props) => {
  const { userInfo, backendUrl, setCurrentChat, setShowChat, currentChat } =
    useContext(AppContext);
  const otherUser = props.users.find((item) => item.id !== userInfo.id);

  const getChat = async (id) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/chat/${id}`);
      setShowChat(true);
      setCurrentChat({ ...props, messages: data.chat.messages });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
      className={`flex items-center ${
        props.seenBy.includes(userInfo.id) || currentChat?.id === props.id
          ? "bg-white "
          : "bg-amber-300"
      } px-4 py-2 rounded-md gap-4`}
      onClick={() => getChat(props.id)}
    >
      <img
        src={otherUser.avatar || "no-avatar.png"}
        alt="profile"
        className="w-10 h-10 rounded-full object-cover"
      />
      <span className="font-medium">{otherUser.username}</span>
      <p className="max-w-50 overflow-hidden text-ellipsis whitespace-nowrap">
        {props.lastMessage}
      </p>
    </div>
  );
};

export default Chat;
