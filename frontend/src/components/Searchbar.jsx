import React, { useState } from "react";
import Counter from "./Counter";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: "",
    maxPrice: "",
  });
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/properties-list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`)
  }

  return (
    <div>
      <div className="flex w-full">
        <div
          className={`cursor-pointer ${
            query.type === "buy"
              ? "bg-black text-white"
              : "border border-slate-300"
          } flex justify-center items-center px-6 py-2`}
          onClick={() =>
            setQuery((prev) => {
              return { ...prev, type: "buy" };
            })
          }
        >
          Buy
        </div>
        <div
          className={`cursor-pointer ${
            query.type === "rent"
              ? "bg-black text-white"
              : "border border-slate-300"
          } flex justify-center items-center px-6 py-2`}
          onClick={() =>
            setQuery((prev) => {
              return { ...prev, type: "rent" };
            })
          }
        >
          Rent
        </div>
      </div>
      <form onSubmit={handleSubmit} className="sm:border border-slate-300 flex flex-col gap-y-1 sm:flex-row">
        <div className="flex flex-col sm:flex-row w-full gap-y-1">
          <input
            type="text"
            placeholder="City Location"
            className="w-full! px-2 border-slate-300 max-sm:border py-3"
            value={query.city}
            onChange={(e) =>
              setQuery((prev) => {
                return { ...prev, city: e.target.value };
              })
            }
          />
          <input
            type="number"
            placeholder="Min Price"
            className="w-full! px-2 border-slate-300 max-sm:border py-3"
            min={0}
            max={1000000}
            value={query.minPrice}
            onChange={(e) =>
              setQuery((prev) => {
                return { ...prev, minPrice: e.target.value };
              })
            }
          />
          <input
            type="number"
            placeholder="Max Price"
            className="w-full! px-2 border-slate-300 max-sm:border py-3"
            min={0}
            max={1000000}
            value={query.maxPrice}
            onChange={(e) =>
              setQuery((prev) => {
                return { ...prev, maxPrice: e.target.value };
              })
            }
          />
        </div>
        <button className="bg-[#fece51] flex justify-center items-center px-4 py-3">
          <img src="/search.png" alt="search" className="w-6" />
        </button>
      </form>
      <div className="my-10 flex gap-10">
        <div className="flex-col gap-y-5">
          <div className="flex items-center gap-1">
            <Counter number={16} />
            <span className="text-[30px] sm:text-[40px]">+</span>
          </div>
          <p className="text-xl">Years of experience</p>
        </div>
        <div className="flex-col gap-y-5">
          <Counter number={200} />
          <p className="text-xl">Award Gained</p>
        </div>
        <div className="flex-col gap-y-5">
          <div className="flex items-center gap-1">
            <Counter number={2000} />
            <span className="text-[30px] sm:text-[40px]">+</span>
          </div>
          <p className="text-xl">Properties Ready</p>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
