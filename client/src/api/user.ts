

import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API } from "../App"

import { Account } from "../types/game"


type ApiResponse = AxiosResponse & {error:boolean}
export async function createAccount(symbol: string, faction: string): Promise<ApiResponse|undefined>
{
  const config: AxiosRequestConfig = {
    method: "POST",
    data: {
      symbol,
      faction,
    },
    url: `${API.BASE_URL}/register`,
  };
  return await API.AXIOS_INSTANCE(config)
    .then((ar:AxiosResponse)=> {return{...ar,error:false}})
    .catch((ae:AxiosError)=>{
      console.log(ae.message);
      const ar = ae.response;
      if(ar){
        return {...ar,error:true}
      }
      return undefined
    })
}

export async function loginAccount(token: string): Promise<ApiResponse|undefined>
{
  const config: AxiosRequestConfig = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    data: {
    },
    url: `${API.BASE_URL}/my/agent`,
  };
  return await API.AXIOS_INSTANCE(config)
    .then((ar:AxiosResponse)=> {return{...ar,error:false}})
    .catch((ae:AxiosError)=>{
      console.log(ae.message);
      const ar = ae.response;
      if(ar){
        return {...ar,error:true}
      }
      return undefined
    })
}

