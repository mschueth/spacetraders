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

import ParticleStarsBG from "./components/ParticleStarsBG";

import HomePage from "./pages/HomePage";
import SystemsPage from "./pages/SystemsPage";
import LoginPage from "./pages/LoginPage";
import CreditsPage from "./pages/CreditsPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

export const API = {
  AXIOS_INSTANCE: Axios.create(),
  BASE_URL: process.env.BASE_URL || `https://api.spacetraders.io/v2/`
}

function LoadGameData(){
  let gd:GameData = {
    token:localStorage.getItem('token')||''
  };
  const keys:GameDataKey[] = ['systems','agent','contracts','factions','factionRep','ships','notifications','info']
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
        <Route path="home" element={<ProtectedRoute><HomePage gameData={gameData} setGameData={setGameData}/></ProtectedRoute>} />
        <Route path="systems" element={<ProtectedRoute><SystemsPage gameData={gameData} setGameData={setGameData}/></ProtectedRoute>} />
        <Route path="login" element={<LoginPage gameData={gameData} setGameData={setGameData} />} />
        <Route path="credits" element={<CreditsPage gameData={gameData} setGameData={setGameData} />} />
        <Route path="about" element={<AboutPage gameData={gameData} setGameData={setGameData} />} />
        <Route path="" element={<ProtectedRoute><HomePage gameData={gameData} setGameData={setGameData} /></ProtectedRoute>} />
        <Route path='*' element={<NotFoundPage />}/>
      </Routes>
      {/* <Footer /> */}
      <ParticleStarsBG version={1} />
    </Router>
  );
}