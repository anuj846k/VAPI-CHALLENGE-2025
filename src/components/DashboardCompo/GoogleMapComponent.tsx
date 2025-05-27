"use client";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { EmergencyAnalysis } from "@/lib/gemini.service";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const GoogleMapComponent = ({
  locationCoordinates,
}: {
  locationCoordinates: EmergencyAnalysis["locationCoordinates"];
}) => {
  const center = {
    lat: locationCoordinates?.lat || 42.287,
    lng: locationCoordinates?.lng || -71.1167,
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
        <Marker
          position={center}
          title="Emergency Location"
          label={{
            text: "Emergency Location",
            color: "black",
            fontWeight: "extrabold",
            fontSize: "26px",
            fontFamily: "Poppins",
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
