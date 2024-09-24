"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

interface Activity {
  time: string;
  activity: string;
  location: string;
  notes: string;
  cost: string;
  long: number;
  lat: number;
}

interface DayItinerary {
  day: string;
  activities: Activity[];
}

interface ItineraryDisplayProps {
  name?: string;
  itinerary: DayItinerary[];
}

export const MapComponent = ({
  lat,
  lng,
  activity,
}: {
  lat: number;
  lng: number;
  activity: Activity;
}) => {
  return (
    <MapContainer
      center={[lat, lng] as LatLngExpression}
      zoom={13}
      style={{ height: "200px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]}>
        <Popup>
          <strong>{activity.activity}</strong>
          <br />
          {activity.location}
          <br />
          {activity.time}
        </Popup>
      </Marker>
    </MapContainer>
  );
};
