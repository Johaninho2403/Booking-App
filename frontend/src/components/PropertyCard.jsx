import { Link } from "react-router-dom";

const PropertyCard = (props) => {
  return (
    <div className="flex flex-col md:flex-row my-5 gap-5 w-full">
      <Link
        to={`/property/${props.id}`}
        className=" w-full sm:w-95 h-40 rounded-lg overflow-hidden"
      >
        <img
          src={props.images[0]}
          alt="property"
          className="w-full! h-full object-cover"
        />
      </Link>
      <div className="flex flex-col gap-y-2 justify-between w-full">
        <h1 className="text-[18px] text-[#272525] font-medium">
          {props.title}
        </h1>
        <div className="flex gap-1">
          <img src="/pin.png" alt="pin" className="w-4" />
          <p className="text-sm text-slate-400">{props.adress}</p>
        </div>
        <span className="bg-[#FEE9B9] px-2 py-0.5 rounded-md self-start">
          $ {props.price}
        </span>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="bg-slate-100 flex gap-1 rounded-md px-2 py-1">
              <img src="/bed.png" alt="bed" className="w-4" />
              <p className="text-sm">
                {props.bedroom} bedroom{props.bedroom > 1 && "s"}
              </p>
            </div>
            <div className="bg-slate-100 flex gap-1 rounded-md px-2 py-1">
              <img src="/bath.png" alt="bath" className="w-4" />
              <p className="text-sm">
                {props.bathroom} bedroom{props.bathroom > 1 && "s"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="border border-slate-300 rounded-md px-2 py-1">
              <img src="/save.png" alt="save" className="w-4 h-4 opacity-40" />
            </button>
            <button className="border border-slate-300 rounded-md px-2 py-1">
              <img src="/chat.png" alt="save" className="w-4 h-4 opacity-40" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
