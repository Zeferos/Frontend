import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import "@reach/combobox/styles.css";
import Axios from 'axios';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import SearchResult from './SearchResult.jsx';

export default function SearchBar({ searchParking }){

    const [input, setInput] = useState('');
    const [destinationList, setDestinationList] = useState([]);
    const [eventList, setEventList] = useState([]);

    function onChange(e) {
        setInput(e.target.value);
        searchByDestination(e.target.value);
        searchbyeventname(e.target.value);
    }

    function onKeyDown(e) {
        const keyword = e.target.value;
        if(e.key==='Enter' && keyword){
            searchParking(keyword);
        }
    }

    function searchByDestination(keyword){
        if(keyword){
            var dataArray = []
            var url = "http://localhost:3001/search-by-destination"
            Axios.put(url, {
                keyword: keyword
            }).then(result => {
                result.data.forEach(item => {
                    dataArray.push(item)
                })
                setDestinationList(dataArray)
            })
        }
    }

    function searchbyeventname(keyword){
        if(keyword){
            var dataArray = []
            var url = "http://localhost:3001/search-by-eventname"
            Axios.put(url, {
                keyword: keyword
            }).then(result => {
                result.data.forEach(item => {
                    dataArray.push(item)
                })
                setEventList(dataArray)
            })
        }
    }

    return(
        <Combobox aria-label="Parkings">
            <ComboboxInput
                type="text"
                placeholder="ค้นหาที่จอดรถ"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={input}
            />
            <ComboboxPopover className="shadow-popup">
                {/* Parking Name Searching */}
                {destinationList.length > 0 ? (
                    <ComboboxList>
                        <span className="fw-bold bg-secondary text-light" style={{ display: "block", padding: 4}}>สถานที่</span>
                            <Link to="/SearchResult" className="text-decoration-none text-dark">
                            {destinationList.map((destination)=>{
                                const str = `${destination.title}`;
                                return <ComboboxOption key={str} value={str} />;
                            })}
                            </Link>
                    </ComboboxList>
                ) : (
                    <span/>
                )}

                {/* Event Name Searching */}
                {eventList.length > 0 ? (
                    <ComboboxList>
                        <span className="fw-bold bg-secondary text-light" style={{ display: "block", padding: 4}}>งานกิจกรรม</span>
                        <Link to="/SearchResult" className="text-decoration-none text-dark">
                            {eventList.map((event)=>{
                                const str = `${event.eventName}`;
                                return <ComboboxOption key={str} value={str} />;
                            })}
                            </Link>
                    </ComboboxList>
                ) : (
                    <span/>
                )}
            </ComboboxPopover>
        </Combobox>

    )
}

SearchBar.prototype = {
    searchParking: PropTypes.func.isRequired
};