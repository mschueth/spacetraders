import React, { useState, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect ,
} from "react-router-dom";

import { Game } from "./types/game"
import Axios from "axios";


import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

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