/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */

import axios from "../lib/axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [showSlider, setShowSlider] = useState(false);
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("userInfo") ? true : false
  );
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo") || null)
  );
  const [showChat, setShowChat] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [socket, setSocket] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const value = {
    currentImage,
    setCurrentImage,
    showSlider,
    setShowSlider,
    isAuth,
    setIsAuth,
    backendUrl,
    userInfo,
    setUserInfo,
    showChat,
    setShowChat,
    currentChat,
    setCurrentChat,
    socket,
  };

  // const getChats = async () => {
  //   try {
  //     const
  //   } catch (error) {
  //     toast.error(error.name)
  //   }
  // }

  useEffect(() => {
    if (isAuth) {
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    }
  }, [isAuth]);

  const read = async () => {
    try {
      await axios.patch(`${backendUrl}/api/chat/${currentChat.id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const socket = io(backendUrl);
    socket.emit("newUser", userInfo.id);
    setSocket(socket);
  }, []);

  useEffect(() => {
    const handleMessage = (message) => {
      if (currentChat) {
        if (currentChat.id === message.chatId) {
          setCurrentChat((prev) => {
            return {
              ...prev,
              lastMessage: message.text,
              messages: [...prev.messages, message],
            };
          });
          read();
        }
      }
    };
    if (socket) {
      socket.on("sendMessage", handleMessage);
      return () => socket.off("sendMessage", handleMessage);
    }
  }, [socket, currentChat]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
