import PropertyCard from "../components/propertyCard";
import Map from "../components/Map";
import { Await, useLoaderData, useSearchParams } from "react-router-dom";
import { Suspense, useState } from "react";
const PropertiesList = () => {
  const { promise } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState({
    city: searchParams.get("city") || "",
    type: searchParams.get("type") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || 1
  })

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchParams(query)
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-2">
      <div className="max-h-[90vh] overflow-y-auto">
        <h1 className="text-[22px] font-normal">Search results for {query.city}</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="city" className="block">
            Location
          </label>
          <input
            type="text"
            placeholder="City Location"
            className="py-2 px-2 my-2 border border-slate-300 w-full!"
            id="city"
          />
          <div className="flex flex-col sm:flex-row justify-between gap-5">
            <div className="w-full">
              <label htmlFor="type" className="block mb-1">
                Type
              </label>
              <select
                name="type"
                id="type"
                className="border border-slate-300 px-2 py-1 w-full!"
                value={query.type}
                onChange={handleChange}
              >
                <option value="">Any</option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="property" className="block mb-1">
                Property
              </label>
              <select
                name="property"
                id="property"
                className="border border-slate-300 px-2 py-1 w-full!"
                value={query.property}
                onChange={handleChange}
              >
                <option value="">Any</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="minPrice" className="block mb-1">
                Min Price
              </label>
              <input
                type="number"
                name="minPrice"
                id="minPrice"
                className="border border-slate-300 px-2 py-1 w-full!"
                placeholder="Min price"
                min={0}
                max={1000000}
                value={query.minPrice}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label htmlFor="type" className="block mb-1">
                Max Price
              </label>
              <input
                type="number"
                name="maxPrice"
                id="maxPrice"
                className="border border-slate-300 px-2 py-1 w-full!"
                placeholder="Max price"
                value={query.maxPrice}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label htmlFor="type" className="block mb-1">
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                id="bedrooms"
                className="border border-slate-300 px-2 py-1 w-full!"
                placeholder="Bedrooms"
                min={1}
                value={query.bedroom}
                onChange={handleChange}
              />
            </div>
            <button className="flex justify-center items-center bg-[#fece51] w-full py-3">
              <img src="/search.png" alt="search" className="w-5" />
            </button>
          </div>
        </form>
        <Suspense fallback={<div>Loading...</div>}>
          <Await
            resolve={promise}
            errorElement={<div>Error Loading Element</div>}
          >
            {({ data }) => {
              return (
                 <div className="mt-5">
                  {data.posts.map((item) => {
                    return <PropertyCard {...item} key={item.id} />;
                  })}
                </div>
              );
            }}
          </Await>
        </Suspense>
      </div>
      {/*  */}
      <Suspense fallback={<div>Loading...</div>}>
        <Await
          resolve={promise}
          errorElement={<div>Error Loading Elemenet</div>}
        >
          {({ data }) => {
            return (
              data.posts.length > 0 && (
                <div className="h-[90vh]">
                  <Map places={data.posts} />
                </div>
              )
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default PropertiesList;
