"use client";
import Link from "next/link";
import React from "react";

const Header = () => {
  const currentDateTime = new Date().toLocaleString();
  const [currentLocation, setCurrentLocation] = React.useState(
    "Fetching location..."
  );

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            if (data && data.address) {
              const { city, town, village, state, country } = data.address;
              const locationName = [city || town || village, state, country]
                .filter(Boolean)
                .join(", ");
              setCurrentLocation(locationName || "Location found");
            } else {
              setCurrentLocation("Location not found");
            }
          } catch {
            setCurrentLocation("Location unavailable");
          }
        },
        () => {
          setCurrentLocation("Location unavailable");
        }
      );
    } else {
      setCurrentLocation("Geolocation not supported");
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-100 shadow-md p-4 flex justify-between items-center z-10">
      <div className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 50 50"
        >
          <path d="M 25 4.5 C 15.204 4.5 5.9439688 11.985969 3.9179688 21.542969 C 3.9119687 21.571969 3.9200156 21.599906 3.9160156 21.628906 C 1.5620156 23.233906 -0.04296875 26.383 -0.04296875 30 C -0.04296875 35.238 3.3210312 39.5 7.4570312 39.5 C 7.7850313 39.5 8.0913438 39.339313 8.2773438 39.070312 C 8.4643437 38.800312 8.5065781 38.456438 8.3925781 38.148438 C 8.3775781 38.110438 6.9550781 34.244 6.9550781 29.5 C 6.9550781 24.506 8.3091719 22.022187 8.3261719 21.992188 C 8.5011719 21.683187 8.4983125 21.305047 8.3203125 20.998047 C 8.1433125 20.689047 7.8130313 20.5 7.4570312 20.5 C 7.0350313 20.5 6.62275 20.554625 6.21875 20.640625 C 8.58675 12.613625 16.57 6.5 25 6.5 C 32.992 6.5 40.688641 12.044172 43.431641 19.576172 C 43.133641 19.530172 42.831438 19.5 42.523438 19.5 C 42.169438 19.5 41.841109 19.689094 41.662109 19.996094 C 41.482109 20.302094 41.481297 20.683187 41.654297 20.992188 C 41.668297 21.016188 43.023437 23.5 43.023438 28.5 C 43.023438 32.44 42.045078 35.767641 41.705078 36.806641 C 40.558078 37.740641 38.815344 39.034297 36.777344 40.154297 C 36.016344 39.305297 34.839391 38.871437 33.650391 39.148438 L 31.867188 39.560547 C 31.024188 39.753547 30.308609 40.262094 29.849609 40.996094 C 29.391609 41.728094 29.245453 42.598453 29.439453 43.439453 C 29.783453 44.935453 31.11975 45.949219 32.59375 45.949219 C 32.83275 45.949219 33.074359 45.923188 33.318359 45.867188 L 35.103516 45.457031 C 35.945516 45.264031 36.661141 44.752531 37.119141 44.019531 C 37.503141 43.406531 37.653984 42.700187 37.583984 41.992188 C 39.728984 40.830188 41.570453 39.483422 42.814453 38.482422 C 46.814453 38.286422 50.023438 34.114 50.023438 29 C 50.023438 25.237 48.284437 21.989172 45.773438 20.451172 C 45.769438 20.376172 45.777859 20.301563 45.755859 20.226562 C 43.152859 11.113563 34.423 4.5 25 4.5 z M 12 19 C 11.447 19 11 19.447 11 20 L 11 32 C 11 32.553 11.447 33 12 33 L 28.044922 33 C 27.540922 34.057 26.743578 35.482375 26.142578 36.484375 C 25.941578 36.819375 25.954828 37.2405 26.173828 37.5625 C 26.360828 37.8395 26.673 38 27 38 C 27.055 38 27.109063 37.995328 27.164062 37.986328 C 33.351062 36.955328 38.412 32.95125 38.625 32.78125 C 38.862 32.59125 39 32.304 39 32 L 39 20 C 39 19.447 38.553 19 38 19 L 12 19 z M 18.5 23 C 19.902 23 21 24.317 21 26 C 21 27.683 19.902 29 18.5 29 C 17.098 29 16 27.683 16 26 C 16 24.317 17.098 23 18.5 23 z M 31.5 23 C 32.902 23 34 24.317 34 26 C 34 27.683 32.902 29 31.5 29 C 30.098 29 29 27.683 29 26 C 29 24.317 30.098 23 31.5 23 z"></path>
        </svg>
        <Link href="/" className="text-xl font-semibold text-gray-800">
          Sahara AI
        </Link>
      </div>

      <div className="text-gray-600">
        {currentDateTime} | {currentLocation}
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-800">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
