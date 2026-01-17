import React, { useState, useRef, useContext } from "react";
import Editor from "../components/Editor";
import Quill from "quill";
import axios from "../lib/axios";
import { AppContext } from "../context/AppContextProvider";
import { toast } from "react-toastify";

const AddPost = () => {
  const [images, setImages] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  const { backendUrl } = useContext(AppContext);

  const Delta = Quill.import("delta");

  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  const handleSubmit = async (formdata) => {
    try {
      const inputs = Object.fromEntries(formdata.entries());

      if (!quillRef.current.root.innerHTML.trim()) {
        throw new Error("The description is required");
      }

      const { data } = await axios.post(
        `${backendUrl}/api/post/add-post`,
        { ...inputs, description: quillRef.current.root.innerHTML },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setImages({
          image1: "",
          image2: "",
          image3: "",
          image4: "",
        });
        quillRef.current.root.innerText = "";
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="md:grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-2">
      <div className="md:max-h-[90vh] md:overflow-y-auto">
        <h1 className="text-3xl font-semibold">Add New Post</h1>
        <form action={handleSubmit} className="mt-5 flex flex-col gap-y-2">
          <div className="flex justify-between gap-2">
            <div className="">
              <label htmlFor="picture1">
                <img
                  src={
                    images.image1
                      ? URL.createObjectURL(images.image1)
                      : `/upload-image.png`
                  }
                  alt=""
                  className=" w-25 sm:w-35 aspect-square object-cover"
                />
              </label>
              <input
                type="file"
                id="picture1"
                name="picture1"
                className="hidden"
                onChange={(e) =>
                  setImages((prev) => {
                    return { ...prev, image1: e.target.files[0] };
                  })
                }
              />
            </div>
            <div className="">
              <label htmlFor="picture2">
                <img
                  src={
                    images.image2
                      ? URL.createObjectURL(images.image2)
                      : `/upload-image.png`
                  }
                  alt=""
                  className="w-25 sm:w-35 aspect-square object-cover"
                />
              </label>
              <input
                type="file"
                id="picture2"
                name="picture2"
                className="hidden"
                onChange={(e) =>
                  setImages((prev) => {
                    return { ...prev, image2: e.target.files[0] };
                  })
                }
              />
            </div>
            <div className="">
              <label htmlFor="picture3">
                <img
                  src={
                    images.image3
                      ? URL.createObjectURL(images.image3)
                      : `/upload-image.png`
                  }
                  alt=""
                  className="w-25 sm:w-35 aspect-square object-cover"
                />
              </label>
              <input
                type="file"
                id="picture3"
                name="picture3"
                className="hidden"
                onChange={(e) =>
                  setImages((prev) => {
                    return { ...prev, image3: e.target.files[0] };
                  })
                }
              />
            </div>
            <div className="">
              <label htmlFor="picture4">
                <img
                  src={
                    images.image4
                      ? URL.createObjectURL(images.image4)
                      : `/upload-image.png`
                  }
                  alt=""
                  className="w-25 sm:w-35 aspect-square object-cover"
                />
              </label>
              <input
                type="file"
                id="picture4"
                name="picture4"
                className="hidden"
                onChange={(e) =>
                  setImages((prev) => {
                    return { ...prev, image4: e.target.files[0] };
                  })
                }
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-x-8">
            <div className="flex flex-col w-full">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="border w-full! py-2 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                className="border w-full! py-2 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="type">Adress</label>
              <input
                type="text"
                name="adress"
                id="adress"
                className="border w-full! py-2 rounded-md"
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="description">Description</label>
            <Editor
              ref={quillRef}
              readOnly={readOnly}
              onSelectionChange={setRange}
              onTextChange={setLastChange}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-x-8">
            <div className="flex flex-col w-full">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                className="border w-full! py-2 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input
                type="number"
                name="bedroom"
                id="bedroom"
                className="border w-full! py-2 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="type">Bathroom Number</label>
              <input
                type="number"
                name="bathroom"
                id="bathroom"
                className="border w-full! py-2 rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-x-8">
            <div className="flex flex-col w-full">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                name="latitude"
                id="latitude"
                className="border w-full! py-2 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                name="longitude"
                id="longitude"
                className="border w-full! py-2 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="type">Type</label>
              <select
                className="border w-full! py-2 rounded-md"
                id="type"
                name="type"
              >
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-x-8">
            <div className="flex flex-col w-full">
              <label htmlFor="city">Property</label>
              <select
                name="property"
                id="property"
                className="border w-full! py-2 rounded-md"
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="utilities">Utilities Policy</label>
              <select
                name="utilities"
                id="utilities"
                className="border w-full! py-2 rounded-md"
              >
                <option value="owner">Owner is responsible</option>
                <option value="renter">Renter is responsible</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="pet">Pet Policy</label>
              <select
                name="pet"
                id="pet"
                className="border w-full! py-2 rounded-md"
              >
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-x-8">
            <div className="flex flex-col w-full">
              <label htmlFor="income">Income Policy</label>
              <input
                type="text"
                name="income"
                id="income"
                className="border w-full! py-2 rounded-md"
                placeholder="Income Policy"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="size">Total Size (sqft)</label>
              <input
                type="number"
                name="size"
                id="size"
                className="border w-full! py-2 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="school">School</label>
              <input
                type="text"
                name="school"
                id="school"
                className="border w-full! py-2 rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-x-8">
            <div className="flex flex-col w-full">
              <label htmlFor="bus">Bus</label>
              <input
                type="text"
                name="bus"
                id="bus"
                className="border w-full! py-2 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="bedroom">Restaurant</label>
              <input
                type="text"
                name="restaurant"
                id="restaurant"
                className="border w-full! py-2 rounded-md"
              />
            </div>
            <button className="w-full bg-[#018081] text-white rounded-md">
              Update
            </button>
          </div>
        </form>
      </div>
      <div className="bg-[#fcf5f3] h-full max-md:hidden min-h-[90vh] flex justify-center items-center">
        <img src="/bg.png" alt="hero" />
      </div>
    </div>
  );
};

export default AddPost;
