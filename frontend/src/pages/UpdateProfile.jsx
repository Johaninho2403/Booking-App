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
    password: "",
  });

  const { backendUrl, isAuth, userInfo } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isAuth){
        navigate('/login')
    }else{
        setInfo({
            username: userInfo.username,
            email: userInfo.email,
            password: ""
        })
    }
  }, [isAuth, userInfo])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!infos.username || !infos.email || !infos.password) {
        throw new Error("Username, email and password are all required");
      }

      if (!validator.isEmail(infos.email)) {
        throw new Error("Invalid email format");
      }

      if (!validator.isStrongPassword(infos.password)) {
        throw new Error("Enter a strong password");
      }

      const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
        ...infos,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-4 w-full max-w-75"
      >
        <h1 className="text-[28px] font-semibold">Update Your Profile</h1>
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
  );
};

export default Register;
