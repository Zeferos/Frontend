import React from "react";

function MapLocate({ panTo }) {
    return (
        <button
            style={{margin: "60px 0px 0px 0px"}}
            className="locate"
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    () => null
                );
            }}
        >
            <img src="compass.svg" alt="compass - locate me" />
        </button>
    );
}

export default MapLocate;