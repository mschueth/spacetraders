import React, { useState, useEffect} from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import {Game} from "./types/game"
import Axios from "axios";


import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

export const API = {
  AXIOS_INSTANCE: Axios.create(),
  BASE_URL: process.env.BASE_URL || `https://api.spacetraders.io/v2/`
}

export var GAME_DATA:Game={
  accounts:[],
  data:{},
}


export default function App() {

  const [UserAccount, setUserAccount] =  useState<any>();

  return (
    <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
        {/* <Footer /> */}
    </Router>
  );
}