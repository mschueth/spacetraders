

import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API } from "../App"

import { Account, GameData } from "../types/gameType";
import { getFactions, postRegister } from "./gameAPI";

type ApiResponse = AxiosResponse & {error:boolean}



async function apiGeneric(method:'GET'|'POST',endpoint:string,token: string,data?:Object): Promise<ApiResponse|undefined>
{
  const config: AxiosRequestConfig = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
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


export async function createAccount(symbol: string, faction: string): Promise<ApiResponse|undefined>
{
  return postRegister({symbol,faction})
}

export async function loginAccount(token: string): Promise<GameData>
{
  const [rspMyAgent,rspMyFactions,rspMyContracts,factions] = await Promise.all([
      getMyAgent(token),
      getMyFactions(token),
      getMyContracts(token),
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
  
  localStorage.setItem('token',token);
  localStorage.setItem('agent',JSON.stringify(data.agent) || '{}');
  localStorage.setItem('factionRep',JSON.stringify(data.factionRep) || '[]');
  localStorage.setItem('factions',JSON.stringify(data.factionRep) || '[]');
  localStorage.setItem('contracts',JSON.stringify(data.contracts) || '[]');

  return data
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
