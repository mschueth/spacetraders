import React, { useState, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { GameData,GameDataKey } from "./types/gameType"
import Axios from "axios";


import AppMenuBar from "./components/AppMenuBar"

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreditsPage from "./pages/CreditsPage";

export const API = {
  AXIOS_INSTANCE: Axios.create(),
  BASE_URL: process.env.BASE_URL || `https://api.spacetraders.io/v2/`
}

function LoadGameData(){
  let gd:GameData = {
    token:localStorage.getItem('token')||''
  };
  const keys:GameDataKey[] = ['agent','contract','faction','ship']
  keys.forEach((key)=>{
    try {
      gd[key]=JSON.parse(localStorage.getItem(key)||'')
    } catch (error) { console.log(`no data for ${key}`)}
  });
  gd.notifications=['hi','world']
  return gd;
}

export default function App() {
  const [gameData, setGameData ] = React.useState<GameData>(LoadGameData());

  const ProtectedRoute = (props:{children: React.JSX.Element})=>{
    if(!(gameData.token||'')){
      return (<Navigate to="/login" />)
    }
    return props.children
  }


  return (
    <Router>
      <AppMenuBar gameData={gameData} />
      <Routes>
        <Route path="/home" element={<ProtectedRoute><HomePage gameData={gameData} /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage gameData={gameData} />} />
        <Route path="/credits" element={<CreditsPage gameData={gameData} />} />
        <Route path="/" element={<ProtectedRoute><HomePage gameData={gameData} /></ProtectedRoute>} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}