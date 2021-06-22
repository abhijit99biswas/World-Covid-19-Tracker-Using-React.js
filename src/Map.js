import React from "react";
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import "./Map.css";
import { showDataOnMap } from "./util";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=''
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;