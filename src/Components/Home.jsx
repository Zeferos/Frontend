import React, { useState, useRef, useCallback } from 'react'
import styled from 'styled-components';

import SearchBar from './SearchBar.js';
import logo from '../assets/parking.svg';
import bg_home from '../assets/bg_home.jpg';
import Axios from 'axios';

const HomeDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    background-image: url("${bg_home}");
    background-size: cover;
`

const IconStyle = styled.img`
    width: 100px; 
    height 100px;
`;

const CenterDiv = styled.div`
    margin: 0;
    position: absolute;
    top: 80%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`

const ImgCenterFrame = styled.div`
    position: relative;
    // position: absolute;
    height: 55%;
    // background-color: tomato;
`
const SearchCenterFrame = styled.div`
    position: relative;
    margin: 30px;
    // background-color: pink;
`

export default function Home() {

    const [resultList, setResultList] = useState([]);

    function searchParking(keyword){
        var dataArray = []
        var url = "http://localhost:3001/search-by-parking"
        Axios.put(url, {
            keyword: keyword
        }).then(result => {
            result.data.forEach(item => {
                dataArray.push(item)
            })
            setResultList(dataArray);
        })
    }

    // onClick ของ "ค้นหาที่จอดรถใกล้ฉัน"
    function onClick(){
        navigator.geolocation.getCurrentPosition(showPosition);
    }

    function showPosition(position){
        console.log("latitude: "+position.coords.latitude);
        console.log("longitude: "+position.coords.longitude);
        var dataArray = []
        var url = "http://localhost:3001/search-by-location"
        Axios.put(url, {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }).then(result => {
            result.data.forEach(item => {
                dataArray.push(item)
            })
            setResultList(dataArray);
        })
    }

        return (
            <div>
                <HomeDiv>
                    <ImgCenterFrame>
                    {/* Center Div for EvenPark Logo */}
                        <CenterDiv>
                            <IconStyle src={logo}/>
                        </CenterDiv>
                    </ImgCenterFrame>
                    <SearchCenterFrame>
                        {/* Center Div for Searching Bar Component*/}
                        <CenterDiv>
                            <SearchBar searchParking={searchParking}/>
                            <button className="text-center"
                                onClick={onClick}>
                                ค้นหาที่จอดรถใกล้ฉัน
                            </button>
                        </CenterDiv>
                    </SearchCenterFrame>

                </HomeDiv>
            </div>
        )
}