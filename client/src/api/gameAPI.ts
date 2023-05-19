

import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API } from "../App"

import { Faction } from "../types/generated/faction";
import { Account, GameData } from "../types/gameType"
import factions_fallback from '../data/factions.json';

type ApiResponse = AxiosResponse & {error:boolean}

async function apiGeneric(method:'GET'|'POST',endpoint:string,token?: string,data?:Object): Promise<ApiResponse|undefined>
{
  const config: AxiosRequestConfig = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token||''}`,
      'limit': 20
    },
    data,
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



export async function createAccount(symbol: string, faction: string): Promise<{api?:ApiResponse,gd?:GameData}|undefined>
{
  const api  = await postRegister({symbol,faction})
  console.log('createAccount: ',api?.status,' ',api?.statusText)
  if(api?.data?.data?.token){
    const token = api.data.data.token
    localStorage.setItem('token',token);
    const gd = await loginAccount(token)
    return {api,gd}
  }
  return {api}
}

export async function loginAccount(token: string): Promise<GameData>
{
  const [rspMyAgent,rspMyFactions,rspMyContracts,rspMyShips,factions] = await Promise.all([
      getMyAgent(token),
      getMyFactions(token),
      getMyContracts(token),
      getMyShips(token),
      getFactions(),
  ]);

  let data:GameData = {token}

  if(rspMyAgent?.data?.data && !rspMyAgent.error){
    data.agent = rspMyAgent.data.data
  }

  if(rspMyFactions?.data?.data && !rspMyFactions.error){
    data.factionRep = rspMyFactions.data.data
    const mf = data.factionRep?.map(f=>f.symbol)
    data.factions = factions.filter((f)=>mf?.includes(f.symbol))
  }
  if(rspMyContracts?.data?.data && !rspMyContracts.error){
    data.contracts = rspMyContracts.data.data
  }
  if(rspMyShips?.data?.data && !rspMyShips.error){
    data.ships = rspMyShips.data.data
  }
  
  localStorage.setItem('token',token);
  localStorage.setItem('agent',JSON.stringify(data.agent) || '{}');
  localStorage.setItem('factionRep',JSON.stringify(data.factionRep) || '[]');
  localStorage.setItem('factions',JSON.stringify(data.factionRep) || '[]');
  localStorage.setItem('contracts',JSON.stringify(data.contracts) || '[]');
  localStorage.setItem('ships',JSON.stringify(data.ships) || '[]');

  return data
}


export async function getFactions(): Promise<Faction[]>
{
  return(apiGeneric('GET','factions').then(r=>r?.data?.data || factions_fallback))
}


export async function postRegister(data:{symbol:string,faction:string}): Promise<ApiResponse|undefined>
{
  return apiGeneric('POST','register',undefined,data)
}

export async function getMyAgent(token: string): Promise<ApiResponse|undefined>
{
  return(apiGeneric('GET','my/agent',token))
}

export async function getMyFactions(token: string): Promise<ApiResponse|undefined>
{
  return(apiGeneric('GET','my/factions',token))
}

export async function getMyContracts(token: string): Promise<ApiResponse|undefined>
{
  return(apiGeneric('GET','my/contracts',token))
}

export async function getMyShips(token: string, symbol?:string): Promise<ApiResponse|undefined>
{
  if(symbol){
    return(apiGeneric('GET',`my/ships/${symbol}`,token))
  }
  return(apiGeneric('GET','my/ships',token))
}

export async function getMyShipCargo(token: string, symbol?:string): Promise<ApiResponse|undefined>
{
    return(apiGeneric('GET',`my/ships/${symbol}/cargo`,token))
}
