import React, { useState, useEffect} from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Axios from "axios";


import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

export const AXIOS_INSTANCE = Axios.create();
export const ROOT_URL = (process.env.NODE_ENV === 'development')?`//localhost:${process.env.PORT || 3000}`:``;

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