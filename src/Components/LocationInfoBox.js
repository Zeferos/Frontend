const LocationInfoBox = ({ info }) => {
    return (
        <div className="location-info">
            <h2>{ info.title }</h2>
            <ul>
                <li>ซอย {info.lane}</li>
                <li>ถนน {info.road}</li>
                <li>แขวง {info.subDistrict}</li>
                <li>เขต {info.district}</li>
                <li>จังหวัด {info.province}</li>
            </ul>
        </div>
    )
}

export default LocationInfoBox
