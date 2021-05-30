import React, { useState, useRef, useCallback } from 'react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import useSwr from "swr";
import "@reach/combobox/styles.css";
import mapStyles from "../mapStyles";
import MapLocate from './MapLocate';
import MapSearch from './MapSearch';
import LocationInfoBox from './LocationInfoBox';
import Loader from './Loader'


const libraries = ["places"];
const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};
const center = {
  lat: 13.747804381548155,
  lng: 100.50070623779297,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const fetcher = (...args) => fetch(...args).then(response => response.json());

function Map() {
  // map setup
    const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,  //เพื่อความปลอดภัย ไม่โชว์ key ของ google map
    libraries,
  });
  // const [markers, setMarkers] = useState([]);
  // const [selected, setSelected] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);

  // const onMapClick = useCallback((event) => {
  //   setMarkers((current) => [
  //     ...current,
  //     {
  //       lat: event.latLng.lat(),
  //       lng: event.latLng.lng(),
  //       time: new Date(),
  //     },
  //   ]);
  // }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // load and format data
  const { data, error } = useSwr('http://localhost:3001/parking-addresses', fetcher);
  const parkinglots = data && !error ? data.slice(0, 200) : [];

  // panTo
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  // map loading status
  if (loadError) return "Error load maps";
  if (!isLoaded) return <Loader />;

  return (
    <div>

      <MapSearch panTo={panTo} />
      <MapLocate panTo={panTo} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center} //ถ้าเอาค่ามาใส่เลยเวลากด marker มันจะเด้งกลับมาที่ตำแหน่งที่ค่านี้กำหนด เพราะมันจะพยายามอัปเดตตรงนี้ทุกครั้งเมื่อหน้ามีการเปลี่ยนแปลง แต่พอเป็นตัววแปร มันจะมองว่าเป็นค่าเดิม มันเลยไม่เด้ง
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {parkinglots.map(parkinglot => (
          <Marker
            key={parkinglot.addressId}
            position={{
              lat: Number(parkinglot.latitude),
              lng: Number(parkinglot.longitude)
            }}
            icon={{
              url: "/placeholder.svg",
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            // onClick={() => {
            //   setSelected(parkinglot);
            // }}
            onClick={() => {
              setLocationInfo(parkinglot);
            }}
          />
        ))}

        {/* {selected ? (            //เราไม่ต้องการให้ InfoWindow มันขึ้นตลอด เลยต้องตรวจก่อนว่า selcted มีค่ารึยัง ถ้าไม่ก็เป็น null (มีอีกวิธีคือเปลี่ยน ? เป็น && แล้วเอา : null ข้างล่างออก)
          <InfoWindow
            position={{
              lat: Number(selected.latitude),
              lng: Number(selected.longitude)
            }}
            onCloseClick={() => {
              setSelected(null);  //ให้เมื่อกดปิด จะยังเปิดใหม่ได้อยู่
            }}
          >
            <div>
              <h2>{selected.title}</h2>
              <ul>
                <li>ซอย {selected.lane}</li>
                <li>ถนน {selected.road}</li>
                <li>แขวง {selected.subDistrict}</li>
                <li>เขต {selected.district}</li>
                <li>จังหวัด {selected.province}</li>
              </ul>
            </div>
          </InfoWindow>
        ) : null} */}

        {/* {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "/placeholder.svg",
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))} */}
      </GoogleMap>
      {locationInfo && <LocationInfoBox info={locationInfo} />} {/* มีค่าหรือไม่ ถ้ามีก็ให้ทำหลังจาก && */}
    </div>
  );
}

export default Map