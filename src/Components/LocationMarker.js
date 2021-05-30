import React, { useState, useRef, useCallback } from "react";
import useSwr from "swr";
import GoogleMapReact from "google-map-react";
import useSuperCluster from "use-supercluster";
import Axios from 'axios'
import "@reach/combobox/styles.css";
import mapStyles from "../mapStyles";
import MapLocate from './MapLocate';
import MapSearch from './MapSearch';
import "../App.css";

const fetcher = (...args) => fetch(...args).then(response => response.json());

const Marker = ({ children }) => children;

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

function LocationMarker() {
    // 1) map setup
    const mapRef = useRef();
    const [zoom, setZoom] = useState(10);
    const [bounds, setBounds] = useState(null);

    // 2) load and format data
    const { data, error } = useSwr('http://localhost:3001/addresses', fetcher);
    const parkinglots = data && !error ? data.slice(0, 200) : [];

    // 3) panTo
    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    // 4) render map
    return (
        <div style={{ height: "100vh", width: "100%" }}>

            <MapSearch panTo={panTo} />
            <MapLocate panTo={panTo} />

            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={{ lat: 13.742804381548155, lng: 100.50070623779297 }}
                defaultZoom={14}
                options={options}
            >
                {parkinglots.map(parkinglot => (
                    <Marker
                        key={parkinglot.addressId}
                        lat={parkinglot.latitude}
                        lng={parkinglot.longitude}
                    >
                        <button className="parkinglot-marker">
                            <img src="/placeholder.svg" alt="parkinglot marker" />
                        </button>
                    </Marker>
                ))}
            </GoogleMapReact>
        </div>
    )
}

export default LocationMarker