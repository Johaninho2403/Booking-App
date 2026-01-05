import { useContext, useEffect } from "react";
import { listData } from "../assets/dummy-data";
import Chat from "../components/Chat";
import Message from "../components/Message";
import PropertyCard from "../components/propertyCard";
import { AppContext } from "../context/AppContextProvider";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const {userInfo} = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(!userInfo){
      navigate('/')
    }
  }, [userInfo])
  return (
    userInfo && <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-2">
      <div className="sm:h-[90vh] sm:overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl ">User Information</h1>
          <button className="bg-[#fece51] px-4 py-2" onClick={() => navigate('/profile/update')}>Update Profile</button>
        </div>
        <div className="flex flex-col gap-y-3 my-5">
          <div className="flex gap-4 items-center">
            <span>Avatar:</span>
            <img
              src={userInfo.avatar || "no-avatar.jpg"}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div className="flex gap-4 items-center">
            <span>Username:</span>
            <span className="font-semibold">{userInfo.username}</span>
          </div>
          <div className="flex gap-4 items-center">
            <span>E-mail:</span>
            <span className="font-semibold">{userInfo.email}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl ">My List</h1>
          <button className="bg-[#fece51] px-4 py-2" onClick={() => navigate('/add-post')}>Add new post</button>
        </div>
        <div className="mt-10">
          {listData.slice(0, 4).map((item) => {
            return <PropertyCard {...item} key={item.id} />;
          })}
        </div>
      </div>
      <div className="bg-[#fcf5f3] h-[90vh] px-4">
        <div className="h-1/2 overflow-y-auto">
          <h1 className="font-light text-3xl text-[#343333]">Messages</h1>
          <div className="flex flex-col gap-y-2 mt-2">
            {new Array(5).fill(0).map((item, index) => {
              return <Chat key={index} />;
            })}
          </div>
        </div>
        <div className="h-1/2 flex flex-col justify-between bg-[#faecca]">
          <div className="flex justify-between items-center bg-[#faecca]  px-2 py-2">
            <div className="flex gap-2 items-center">
              <img
                src={userInfo.avatar}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-semibold">{userInfo.username}</span>
            </div>
            <span className="text-2xl cursor-pointer">X</span>
          </div>
          <div className="bg-white px-2 w-full flex-1 overflow-y-scroll mb-0.5">
            {new Array(10).fill(0).map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex ${
                    index % 2 == 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  <Message index={index} />
                </div>
              );
            })}
          </div>
          <div className="flex gap-1">
            <textarea
              name="message"
              id="message"
              className="resize-none px-2 py-px bg-white w-full!"
            ></textarea>
            <button className="bg-[#faecca] px-8">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
