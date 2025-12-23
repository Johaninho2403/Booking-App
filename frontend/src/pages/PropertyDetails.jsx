import { useContext } from "react";
import { singlePostData, userData } from "../assets/dummy-data";
import Map from "../components/Map";
import { AppContext } from "../context/AppContextProvider";
import Slider from "../components/Slider";

const PropertyDetails = () => {
  const { setCurrentImage, setShowSlider, showSlider } = useContext(AppContext);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-[3fr_2fr] gap-2">
        <div className="sm:h-[90vh] sm:overflow-y-auto">
          <div className="grid grid-cols-[3fr_1fr] gap-4">
            <div className="rounded-lg overflow-hidden">
              <img
                src={singlePostData.images[0]}
                alt="property"
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => {
                  setCurrentImage(0);
                  setShowSlider(true);
                }}
              />
            </div>
            <div className="flex flex-col justify-between gap-y-5">
              {singlePostData.images.slice(1).map((item, index) => {
                return (
                  <div className="rounded-lg overflow-hidden h-20" key={index}>
                    <img
                      src={item}
                      alt="property"
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => {
                        setCurrentImage(index + 1);
                        setShowSlider(true);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="my-8 flex justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-xl text-[#3c3b3b]">{singlePostData.title}</h1>
              <div className="flex gap-1">
                <img src="/pin.png" alt="pin" className="w-4" />
                <p className="text-slate-400 text-sm">
                  {singlePostData.address}
                </p>
              </div>
              <span className="bg-[#FEE9B9] px-2 py-0.5 rounded-md self-start">
                $ {singlePostData.price}
              </span>
            </div>
            <div className="flex flex-col py-2 px-6 rounded-lg bg-[#FEE9B9] items-center gap-3">
              <img
                src={userData.img}
                alt="host"
                className="w-15 h-15 rounded-full object-cover"
              />
              <p className="text-xl font-medium">{userData.name}</p>
            </div>
          </div>
          <p className="text-sm text-justify text-[#3c3b3b]">
            {singlePostData.description}
          </p>
        </div>
        <div className="bg-[#fcf5f3] min-h-[90vh] px-4">
          <h1 className="text-[18px] font-semibold">General</h1>
          <div className="bg-white rounded-lg px-2 py-1 flex flex-col gap-2 mt-2">
            <div className="flex gap-2 items-center">
              <img src="/utility.png" alt="utility" className="w-6 h-6" />
              <div>
                <div className="font-semibold">Utilities</div>
                <div className="text-sm">Renter is responsible</div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <img src="/pet.png" alt="pet" className="w-6 h-6" />
              <div>
                <div className="font-semibold">Pet Policy</div>
                <div className="text-sm">Pets allowed</div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <img src="/fee.png" alt="fee" className="w-3 h-3 sm:w-6 sm:h-6" />
              <div>
                <div className="font-semibold">Property Fees</div>
                <div className="text-sm">
                  Must have 3x the rent in total household income
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-[18px] font-semibold mt-2">Room Sizes</h1>
          <div className="flex justify-between mt-2">
            <div className="bg-white flex items-center gap-2 px-2 py-2 rounded-md">
              <img
                src="/size.png"
                alt="size"
                className="w-3 h-3 sm:w-6 sm:h-6"
              />
              <span className="text-sm">
                {Math.round(singlePostData.size / 10.7639104)}sqm(
                {singlePostData.size}sqft)
              </span>
            </div>
            <div className="bg-white flex items-center gap-2 px-2 py-2 rounded-md">
              <img src="/bed.png" alt="bed" className="w-3 h-3 sm:w-6 sm:h-6" />
              <span className="text-sm">
                {singlePostData.bedroom} bedroom
                {singlePostData.bedroom > 1 && "s"}
              </span>
            </div>
            <div className="bg-white flex items-center gap-2 px-2 py-2 rounded-md">
              <img
                src="/bath.png"
                alt="bath"
                className="w-3 h-3 sm:w-6 sm:h-6"
              />
              <span className="text-sm">
                {singlePostData.bathroom} bathroom
                {singlePostData.bathroom > 1 && "s"}
              </span>
            </div>
          </div>
          <h1 className="text-[18px] font-semibold mt-2">Nearby Places</h1>
          <div className="flex justify-between mt-2 bg-white px-2 py-2 rounded-lg">
            <div className="flex gap-2">
              <img src="/school.png" alt="school" className="w-6 h-6" />
              <div>
                <div className="font-semibold">School</div>
                <div className="text-sm">{singlePostData.school}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <img src="/school.png" alt="bus" className="w-6 h-6" />
              <div>
                <div className="font-semibold">Bus Stop</div>
                <div className="text-sm">{singlePostData.bus}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <img src="/restaurant.png" alt="restaurant" className="w-6 h-6" />
              <div>
                <div className="font-semibold">Restaurant</div>
                <div className="text-sm">{singlePostData.restaurant}</div>
              </div>
            </div>
          </div>
          <h1 className="text-[18px] font-semibold mt-2">Location</h1>
          <div className={`mt-2 h-40 ${showSlider ? "hidden" : ""} rounded-lg`}>
            <Map places={[singlePostData]} />
          </div>
          <div className="flex justify-between items-center mt-4">
            <button className="flex justify-center items-center gap-1 bg-white px-3 py-3 border border-amber-300">
              <img src="/chat.png" alt="chat" className="w-4 h-4" />
              Send Message
            </button>
            <button className="flex justify-center items-center gap-1 bg-white px-3 py-3 border border-amber-300">
              <img src="/save.png" alt="save" className="w-4 h-4" />
              Save the place
            </button>
          </div>
        </div>
      </div>
      <Slider />
    </div>
  );
};

export default PropertyDetails;
