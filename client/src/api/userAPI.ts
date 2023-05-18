

import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API } from "../App"

import { Faction } from "../types/generated/faction";
import { Account, GameData } from "../types/gameType"
import factions_fallback from '../data/factions.json';

type ApiResponse = AxiosResponse & {error:boolean}



async function getGeneric(token: string, endpoint:string): Promise<ApiResponse|undefined>
{
  const config: AxiosRequestConfig = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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

export async function loginAccount(token: string): Promise<any>
{
  const rspMyAgent = await getMyAgent(token);
  const rspMyFactions = await getMyFactions(token);
  const rspMyContracts = await getMyContracts(token);

  let data:GameData ={}
  if(rspMyAgent?.data?.data && !rspMyAgent.error){
    data.agent = rspMyAgent.data.data
  }
  if(rspMyFactions?.data?.data && !rspMyFactions.error){
    data.factionRep = rspMyFactions.data.data
  }


  return {rspMyAgent,rspMyFactions,rspMyContracts}
}


export async function getMyAgent(token: string): Promise<ApiResponse|undefined>
{
  return(getGeneric(token,'my/agent'))
}

export async function getMyFactions(token: string): Promise<ApiResponse|undefined>
{
  return(getGeneric(token,'my/factions'))
}

export async function getMyContracts(token: string): Promise<ApiResponse|undefined>
{
  return(getGeneric(token,'my/contracts'))
}
