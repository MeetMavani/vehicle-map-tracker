import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { vehicleIcon, Initial_Positon } from "../data/constants";
import { routeCoordinates } from "../data/dummy";
import gsap from "gsap";
import 'leaflet-rotatedmarker';

function MapComponent() {
  const markerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let interval;
    if (isAnimating) {
      interval = setInterval(() => {
        if (!markerRef.current) return;
        if (currentIndex >= routeCoordinates.length - 1) return;

        const [lat1, lng1] = routeCoordinates[currentIndex];
        const [lat2, lng2] = routeCoordinates[currentIndex + 1];

        const obj = { lat: lat1, lng: lng1 };

        gsap.to(obj, {
          lat: lat2,
          lng: lng2,
          duration: 2,
          onUpdate: () => {
            markerRef.current.setLatLng([obj.lat, obj.lng]);
          },
        });

        setCurrentIndex((prev) => prev + 1);
      }, 2000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const handleStart = () => {
    setIsAnimating(true);
  };

  return (
    <div className="relative">

      <MapContainer
        center={Initial_Positon}
        zoom={15}
        scrollWheelZoom={true}
        className="h-screen w-screen"
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={Initial_Positon} icon={vehicleIcon}  rotationAngle={-90} rotationOrigin="center" ref={markerRef} />

        <Polyline positions={routeCoordinates} color="blue" />
        
      </MapContainer>

      {/* Start Button */}
      <div className="absolute top-5 left-12 z-[1000]">
        <button
          onClick={handleStart}
          className="px-5 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
        >
          Start
        </button>
      </div>
      
    </div>
  );
}

export default MapComponent;
