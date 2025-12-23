import React from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";

import "leaflet/dist/leaflet.css";
import Location from "./Location";

const Map = ({places}) => {
  
  return (
    <div className="h-full">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={7}
        scrollWheelZoom={false}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places.map(item => {
            return (
                <Location key={item.id} {...item} />
            )
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
