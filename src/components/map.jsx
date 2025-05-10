import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { vehicleIcon, Initial_Positon } from "../data/constants";
import { routeCoordinates } from "../data/dummy";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function MapComponent() {
  const markerRef = useRef(null);
  const indexRef = useRef(0); // we avoid setState
  const tempObj = useRef({ 
    lat: routeCoordinates[0][0], 
    lng: routeCoordinates[0][1] 
  });

  const animateMarker = () => {
    if (indexRef.current >= routeCoordinates.length - 1) return;

    const [nextLat, nextLng] = routeCoordinates[indexRef.current + 1];

    gsap.to(tempObj.current, {
      lat: nextLat,
      lng: nextLng,
      duration: 2,
      ease: "power1.inOut",
      onUpdate: () => {
        markerRef.current.setLatLng([
          tempObj.current.lat,
          tempObj.current.lng,
        ]);
      },
      onComplete: () => {
        indexRef.current += 1;
        animateMarker(); // chain next move
      },
    });
  };

  useEffect(() => {
    animateMarker(); // start the animation once
  }, []);

  return (
    <MapContainer
      center={Initial_Positon}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker
        position={Initial_Positon}
        icon={vehicleIcon}
        ref={markerRef}
      />
      <Polyline positions={routeCoordinates} color="blue" />
    </MapContainer>
  );
}

export default MapComponent;
