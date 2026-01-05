import React, { useContext, useEffect, useState } from "react";
import validator from "validator";
import axios from "../lib/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";
import { Link } from "react-router-dom";

const Register = () => {
  const [infos, setInfo] = useState({
    username: "",
    email: "",
    avatar: "",
  });
  const [photo, setPhoto] = useState(null);

  const { backendUrl, isAuth, userInfo, setUserInfo } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    } else {
      setInfo({
        username: userInfo.username,
        email: userInfo.email,
        avatar: userInfo.avatar,
      });
    }
  }, [isAuth, userInfo]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!infos.username || !infos.email) {
        throw new Error("Username and email are all required");
      }

      if (!validator.isEmail(infos.email)) {
        throw new Error("Invalid email format");
      }

      const formData = new FormData();

      formData.append("username", infos.username);
      formData.append("email", infos.email);

      if (photo) {
        formData.append("avatar", photo);
      }

      const { data } = await axios.patch(
        `${backendUrl}/api/user/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
        setUserInfo(data.userInfo);
        navigate("/profile");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    isAuth && (
      <div className="flex flex-col gap-y-2 justify-center items-center h-[90vh]">
        <h1 className="text-[28px] font-semibold">Update Your Profile</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-4 w-full max-w-75"
        >
          <label htmlFor="pfp" className="">
            <img
              src={infos.avatar ? infos.avatar : `/no-avatar.jpg`}
              alt=""
              className="w-25 aspect-square rounded-full mx-auto cursor-pointer object-cover"
            />
          </label>
          <input
            type="file"
            id="pfp"
            className="hidden"
            onChange={(e) => {
              setPhoto(e.target.files[0]);
              setInfo((prev) => {
                return {
                  ...prev,
                  avatar: URL.createObjectURL(e.target.files[0]),
                };
              });
            }}
          />
          <input
            type="text"
            placeholder="Username"
            className="border border-slate-300 px-4 py-3 rounded-md"
            value={infos.username}
            onChange={(e) =>
              setInfo((prev) => {
                return { ...prev, username: e.target.value };
              })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-slate-300 px-4 py-3 rounded-md"
            value={infos.email}
            onChange={(e) =>
              setInfo((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
          />
          <button className="py-3 bg-[#018081] text-white rounded-md">
            Update
          </button>
        </form>
      </div>
    )
  );
};

export default Register;
