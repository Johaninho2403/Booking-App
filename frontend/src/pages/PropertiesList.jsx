import { listData } from "../assets/dummy-data";
import PropertyCard from "../components/propertyCard";
import Map from "../components/Map";
const PropertiesList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-2">
      <div className="max-h-[90vh] overflow-y-auto">
        <h1 className="text-[22px] font-normal">Search results for</h1>
        <form>
          <label htmlFor="location" className="block">
            Location
          </label>
          <input
            type="text"
            placeholder="City Location"
            className="py-2 px-2 my-2 border border-slate-300 w-full!"
            id="location"
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
              >
                <option value="">Any</option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="type" className="block mb-1">
                Property
              </label>
              <select
                name="type"
                id="type"
                className="border border-slate-300 px-2 py-1 w-full!"
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
                min={0}
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
                min={0}
              />
            </div>
            <button className="flex justify-center items-center bg-[#fece51] w-full py-3">
              <img src="/search.png" alt="search" className="w-5" />
            </button>
          </div>
        </form>
        <div className="mt-5">
          {listData.map((item) => {
            return (
              <div key={item.id}>
                <PropertyCard {...item} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="">
        <Map places={listData}/>
      </div>
    </div>
  );
};

export default PropertiesList;
