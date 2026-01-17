import { Suspense, useContext, useEffect, useRef } from "react";
import Chat from "../components/Chat";
import Message from "../components/Message";
import PropertyCard from "../components/propertyCard";
import { AppContext } from "../context/AppContextProvider";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { toast } from "react-toastify";
import axios from "../lib/axios";

const Profile = () => {
  const {
    isAuth,
    userInfo,
    showChat,
    currentChat,
    setCurrentChat,
    setShowChat,
    backendUrl,
    socket,

  } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const { profilePromise, chatsPromise } = useLoaderData();
  const div = useRef();
  

  const sendMessage = async (formdata) => {
    const text = formdata.get("text");
    try {
      if (!text.trim()) {
        throw new Error("You must enter a message!");
      }
      const { data } = await axios.post(
        `${backendUrl}/api/message/add-message/${currentChat.id}`,
        { text }
      );

      if (data.success) {
        const receiverId = currentChat.usersId.find(
          (userId) => userId !== userInfo.id
        );
        socket.emit("newMessage", receiverId, data.message);
        toast.success("Message sent!");
        setCurrentChat((prev) => {
          return { ...prev, messages: [...prev.messages, data.message] };
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-2">
      <div className="sm:h-[90vh] sm:overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl ">User Information</h1>
          <button
            className="bg-[#fece51] px-4 py-2"
            onClick={() => navigate("/profile/update")}
          >
            Update Profile
          </button>
        </div>
        <div className="flex flex-col gap-y-3 my-5">
          <div className="flex gap-4 items-center">
            <span>Avatar:</span>
            <Suspense
              fallback={
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  animation="wave"
                />
              }
            >
              <Await resolve={profilePromise}>
                {({ data }) => {
                  const { user } = data;
                  return (
                    <img
                      src={user.avatar || "no-avatar.png"}
                      alt="avatar"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  );
                }}
              </Await>
            </Suspense>
          </div>
          <div className="flex gap-4 items-center">
            <span>Username:</span>
            <Suspense
              fallback={
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "50%" }}
                />
              }
            >
              <Await resolve={profilePromise}>
                {({ data }) => {
                  const { user } = data;
                  return <span className="font-semibold">{user.username}</span>;
                }}
              </Await>
            </Suspense>
          </div>
          <div className="flex gap-4 items-center">
            <span>E-mail:</span>
            <Suspense
              fallback={
                <Skeleton
                  variant="text"
                  animation="wave"
                  sx={{ fontSize: "1rem", width: "50%" }}
                />
              }
            >
              <Await resolve={profilePromise}>
                {({ data }) => {
                  const { user } = data;
                  return <span className="font-semibold">{user.email}</span>;
                }}
              </Await>
            </Suspense>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl ">My List</h1>
          <button
            className="bg-[#fece51] px-4 py-2"
            onClick={() => navigate("/add-post")}
          >
            Add new post
          </button>
        </div>
        <Suspense fallback={<></>}>
          <Await resolve={profilePromise}>
            {({ data }) => {
              const { user } = data;
              const { posts } = user;
              return (
                <div className="mt-10">
                  {posts.map((item) => {
                    return <PropertyCard {...item} key={item.id} />;
                  })}
                </div>
              );
            }}
          </Await>
        </Suspense>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl mt-5">Saved Posts</h1>
        </div>
        <div className="mt-10">
          <Suspense fallback={<></>}>
            <Await resolve={profilePromise}>
              {({ data }) => {
                const { user } = data;
                const { savedPosts } = user;
                return (
                  <div className="mt-10">
                    {savedPosts.map((item) => {
                      return <PropertyCard {...item.post} key={item.post.id} />;
                    })}
                  </div>
                );
              }}
            </Await>
          </Suspense>
        </div>
      </div>
      <Suspense
        fallback={
          <Skeleton
            variant="rectangle"
            className="md:h-[90vh]!"
            animation="wave"
          />
        }
      >
        <Await resolve={chatsPromise}>
          {({data}) => {
            const {chats} = data
            return (
            <div className="bg-[#fcf5f3] h-[90vh] px-4">
                <div className="h-1/2 overflow-y-auto">
                  <h1 className="font-light text-3xl text-[#343333]">
                    Messages
                  </h1>
                  <div className="flex flex-col gap-y-2 mt-2">
                    {chats.map((item) => {
                      return <Chat key={item.id} {...item} />;
                    })}
                  </div>
                </div>
                {showChat && (
                  <div className="h-1/2 flex flex-col justify-between bg-[#faecca]">
                    <div className="flex justify-between items-center bg-[#faecca]  px-2 py-2">
                      <div className="flex gap-2 items-center">
                        <img
                          src={
                            currentChat.users.find(
                              (item) => item.id !== userInfo.id
                            ).avatar || "no-avatar.png"
                          }
                          alt="profile"
                          className="w-8 h-8 rounded-full object-cover"
                        />

                        <span className="font-semibold">
                          {userInfo.username}
                        </span>
                      </div>
                      <span
                        className="text-2xl cursor-pointer"
                        onClick={() => setShowChat(!showChat)}
                      >
                        X
                      </span>
                    </div>
                    <div className="bg-white px-2 w-full flex-1 overflow-y-scroll mb-0.5">
                      {currentChat.messages.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className={`flex ${
                              item.userId !== userInfo.id
                                ? "justify-start"
                                : "justify-end"
                            }`}
                          >
                            <Message {...item} />
                          </div>
                        );
                      })}
                      <div ref={div}></div>
                    </div>
                    <form className="flex gap-1" action={sendMessage}>
                      <textarea
                        name="text"
                        id="text"
                        className="resize-none px-2 py-px bg-white w-full!"
                      ></textarea>
                      <button className="bg-[#faecca] px-8">Send</button>
                    </form>
                  </div>
                )}
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default Profile;
