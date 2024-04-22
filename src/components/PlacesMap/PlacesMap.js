import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import styles from "./PlacesMap.module.css";

const containerStyle = {
  width: "100",
  height: "100%",
};

const center = {
  lat: -23.447466,
  lng: -47.381124,
};

function PlacesMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDyrmex_d7yujjUW1ljyDVnudkb_u2qTKs",
  });

  const position = {
    lat: -23.447466,
    lng: -47.381124,
  };

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
      <Marker
        position={position}
        options={{ label: { text: "Marmite-se", className: "mapMarker" } }}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(PlacesMap);
