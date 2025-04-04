"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
}

const defaults = {
  zoom: 19,
};
const Map = (Map: MapProps) => {
  const { zoom = defaults.zoom, posix } = Map;

  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      zoomControl={false}
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      keyboard={false}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={posix} draggable={false}></Marker>
    </MapContainer>
  );
};

export default Map;
