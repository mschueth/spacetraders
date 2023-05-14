

import { API } from "../App"

import { Account } from "../types/game"


const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    },
  };
  
  fetch(`${API.BASE_URL}/my/agent`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));