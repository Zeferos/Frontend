import React, { useState } from 'react';
import styled from 'styled-components';
import "@reach/combobox/styles.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './Components/Navbar';
import Map from './Components/Map';
import Home from './Components/Home';
// import SearchResult from './Components/SearchResult';

const Body = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
`;

export default function App() {
  return(
    <Body>
      <Router>
            <Navbar/>
            <Switch>
              <Route path="/" exact component={()=> (<Home/>)}/>
              {/* <Route path="/SearchResult" exact component={()=> (<SearchResult/>)}/> */}
              <Route path="/Map" exact component={()=> <Map/>}/>
            </Switch>
      </Router>
            
    </Body>
  );
}