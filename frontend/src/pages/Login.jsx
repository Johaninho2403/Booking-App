import React, { useContext, useState } from "react";
import validator from "validator";
import axios from "../lib/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";
import { Link } from "react-router-dom";

const Login = () => {
  const [infos, setData] = useState({
    email: "",
    password: "",
  });

  const { backendUrl, setIsAuth } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!infos.email || !infos.password) {
        throw new Error("Username, email and password are all required");
      }

      if (!validator.isEmail(infos.email)) {
        throw new Error("Invalid email format");
      }

      if (!validator.isStrongPassword(infos.password)) {
        throw new Error("Enter a strong password");
      }

      const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
        ...infos,
      });

      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
        setIsAuth(true);
        navigate(-1);
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
        <h1 className="text-[28px] font-semibold">Welcome Back</h1>
        <input
          type="email"
          placeholder="Email"
          className="border border-slate-300 px-4 py-3 rounded-md"
          value={infos.email}
          onChange={(e) =>
            setData((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-slate-300 px-4 py-3 rounded-md"
          value={infos.password}
          onChange={(e) =>
            setData((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
        />
        <button className="py-3 bg-[#018081] text-white rounded-md">
          Login
        </button>
        <Link to={"/register"} className="underline font-light self-start">
          You don't have an account ?
        </Link>
      </form>
    </div>
  );
};

export default Login;
