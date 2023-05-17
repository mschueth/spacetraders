import React, { useState, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect ,
} from "react-router-dom";

import { Game } from "./types/gameType"
import Axios from "axios";


import AppMenuBar from "./components/AppMenuBar"

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreditsPage from "./pages/CreditsPage";

export const API = {
  AXIOS_INSTANCE: Axios.create(),
  BASE_URL: process.env.BASE_URL || `https://api.spacetraders.io/v2/`
}


export default function App() {
  const [apitoken, ] = React.useState<string>(localStorage.getItem('apitoken')||'')

  // if(!!!apitoken){
  //   return redirect('/login')
  // }


  return (
    <Router>
      <AppMenuBar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/credits" element={<CreditsPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}