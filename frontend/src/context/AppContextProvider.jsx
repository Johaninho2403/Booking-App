import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [showSlider, setShowSlider] = useState(false);
  const [isAuth, setIsAuth] = useState(localStorage.getItem("userInfo") ? true : false);
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo") || null));
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
  };
    

  useEffect(() => {
    if (isAuth) {
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    }
  }, [isAuth]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
