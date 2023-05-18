

import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API } from "../App"

import { Faction } from "../types/generated/faction";
import { Account, GameData } from "../types/gameType"
import factions_fallback from '../data/factions.json';

type ApiResponse = AxiosResponse & {error:boolean}


async function getGeneric(endpoint:string): Promise<ApiResponse|undefined>
{
  const config: AxiosRequestConfig = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'limit': 100
    },
    data: {
    },
    url: `${API.BASE_URL}/${endpoint}`,
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

export async function getFactions(): Promise<Faction[]>
{
  return(getGeneric('factions').then(r=>r?.data?.data || factions_fallback))
}