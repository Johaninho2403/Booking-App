import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";
import { userData } from "../assets/dummy-data";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuth} = useContext(AppContext);

  return (
    <header className="grid grid-cols-[3fr_2fr] gap-2 justify-between items-center h-[10vh] sticky top-0 left-0 z-1 bg-white">
      <div className="flex items-center gap-10 py-5">
        <img
          src="/logo.png"
          alt="logo"
          className="w-7 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <nav>
          <ul className="hidden md:flex gap-10 lg:gap-12.5">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
            <li>
              <Link to={"/agents"}>Agents</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="transparent md:bg-[#fcf5f3] py-5  h-full px-5 flex justify-end">
        <div className="justify-end gap-5 hidden md:flex items-center">
          {!isAuth ? (
            <>
              <button className="transition-all duration-400 ease-initial hover:scale-105 ">
                Sign In
              </button>
              <button className="bg-[#fece51] py-1 rounded-lg px-2 transition-all duration-400 ease-initial hover:scale-105">
                Sign Up
              </button>
            </>
          ) : (
            <>
              <img
                src={userData.img}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span>{userData.name}</span>
              <div className="bg-[#fece51] cursor-pointer px-2 py-1 relative">
                Profile
                <span className="absolute bg-red-600 text-white flex justify-center items-center rounded-full w-5 h-5 -top-1.5 -right-1.5">3</span>
                </div>
            </>
          )}
        </div>
        <img
          src="/menu.png"
          alt="menu"
          className="md:hidden w-7 h-7 z-2 cursor-pointer flex"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      <div
        className={`fixed w-40 bg-black text-white top-0 bottom-0 ${
          isMenuOpen ? "right-0" : "-right-40"
        } md:-right-40 transition-all px-10 flex justify-center items-center z-1`}
      >
        <div className="flex flex-col gap-y-10">
          <div>
            <Link to={"/"} onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </div>
          <div>
            <Link to={"/about"} onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </div>
          <div>
            <Link to={"/contact"} onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </div>
          <div>
            <Link to={"/agents"} onClick={() => setIsMenuOpen(false)}>
              Agents
            </Link>
          </div>
          <div>
            <Link to={"/"} onClick={() => setIsMenuOpen(false)}>
              Sign In
            </Link>
          </div>
          <div>
            <Link to={"/"} onClick={() => setIsMenuOpen(false)}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
