import React from "react";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
const Location = (props) => {

  return (
    <div>
      <Marker position={[props.latitude, props.longitude]}>
        <Popup>
          <div className="flex gap-2">
            <div className="w-15 h-12 rounded-lg overflow-hidden">
              <img
                src={props.images[0]}
                alt="property"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div className="max-w-20 overflow-hidden  whitespace-nowrap text-ellipsis text-[#4889B7]">
                {props.title}
              </div>
              <div>
                {props.bedroom} bedroom{props.bedroom > 1 && "s"}
              </div>
              <div className="font-semibold">$ {props.price}</div>
            </div>
          </div>
        </Popup>
      </Marker>
    </div>
  );
};

export default Location;
