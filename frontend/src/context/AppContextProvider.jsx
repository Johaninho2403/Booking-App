import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [showSlider, setShowSlider] = useState(false);
  const [isAuth, setIsAuth] = useState(true);
  const value = {
    currentImage,
    setCurrentImage,
    showSlider,
    setShowSlider,
    isAuth,
    setIsAuth,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
