export const Initial_Positon = [18.50080, 73.93793];

import L from 'leaflet';
import vehicleImg from  '../assets/car2.png';

export const vehicleIcon = new L.icon({
    iconUrl: vehicleImg,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
})