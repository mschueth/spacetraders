import React, { useState, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { Game } from "./types/game"
import Axios from "axios";


import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

export const API = {
  AXIOS_INSTANCE: Axios.create(),
  BASE_URL: process.env.BASE_URL || `https://api.spacetraders.io/v2/`
}

export var GAME_DATA: Game = {
  accounts: [
    {
      token:"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiREVWLVRFU1QiLCJpYXQiOjE2ODQwMjYxNzMsInN1YiI6ImFnZW50LXRva2VuIn0.bVnrlfgiuB1OiZjuNwj8ZHpHHl0YeRQ4E1AsfcMIUMObsR9ZMigdqCQ3sRTrvsvyx7iHaYa96vGnn58Ck_MlmPbhNvyNCJrhLmSkMLWSkpVXj5zhMkEJFhUeJUPrGDs636_0z3w9-w9FBZrydxGgh6Z6RwqzZdqZtlrTnEDF0U7F2rt2SpxlbTsE7vGWf2uBSCvNE4R79plEZ-komYjqOi_aGzK4-IoOLAfB2mVbgzjtUcq5xFr_PCHKzCUMtzvdO0wp_JKnom5LjTIo4s4ZV-3AxZ6gC5J9beQSudAZ5X9NNP_zmqZiAjWVDv4Mqel_zuqGxVaTkO2iMaTWr1NzyQ",
      agent: {
        accountId:"clhmppb5w13fls60d45kxyhpv",
        symbol:"DEV-TEST",
        headquarters:"X1-ZA40-15970B",
        credits:100000,
      }
    }
  ],
  data: {},
}


export default function App() {

  const [UserAccount, setUserAccount] = useState<any>();

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