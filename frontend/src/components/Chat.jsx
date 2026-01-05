import React, { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
const Chat = () => {
  const {userInfo} = useContext(AppContext)
  return (
    <div className="flex items-center bg-white px-4 py-2 rounded-md gap-4">
      <img
        src={userInfo.avatar}
        alt="profile"
        className="w-10 h-10 rounded-full object-cover"
      />
      <span className="font-medium">{userInfo.username}</span>
      <p className="max-w-50 overflow-hidden text-ellipsis whitespace-nowrap">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae
        suscipit quae ullam, aliquam eum, iure alias magni delectus cumque totam
        voluptas, ipsum repudiandae molestias quos rerum rem. Nobis, voluptates
        laborum.
      </p>
    </div>
  );
};

export default Chat;
