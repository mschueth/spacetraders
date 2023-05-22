

import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API } from "../App"

import { Faction } from "../types/generated/faction";
import { GameData } from "../types/gameType"
import factions_fallback from '../data/factions.json';
import { 
  waypointToSystem,
  uniqueStringArray,
 } from '../util/formatUtil';

type ApiResponse = AxiosResponse & {error:boolean}

async function apiGeneric(method:'GET'|'POST',endpoint:string,token?: string,data?:Object, limit?:number, page?:number): Promise<ApiResponse|undefined>
{
  let url = `${API.BASE_URL}`
  if(endpoint){
    url = `${url}/${endpoint}`
  }
  limit ??= 20;
  page ??= 1;
  const config: AxiosRequestConfig = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token||''}`,
      'limit': limit,
      'page': page,
    },
    data,
    url,
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


export async function initializeApp(gd:GameData): Promise<GameData>{
  const [factions, rspGameInfo] = await Promise.all([
      getFactions(),
      getGameInfo(),
  ]);
  if(rspGameInfo?.data && !rspGameInfo.error){
    gd.info = rspGameInfo.data
  }
  if(factions && factions.length > 0){
    gd.factions = factions
  }
  return gd
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
  const [rspMyAgent,rspMyFactions,rspMyContracts,rspMyShips,factions,gameInfo] = await Promise.all([
      getMyAgent(token),
      getMyFactions(token),
      getMyContracts(token),
      getMyShips(token),
      getFactions(),
      getGameInfo(),
  ]);

  let data:GameData = {token}
  let systemSymbols:string[] = [];

  if(rspMyAgent?.data?.data && !rspMyAgent.error){
    data.agent = rspMyAgent.data.data
    systemSymbols.push(waypointToSystem(rspMyAgent.data.data.headquarters))
  }

  if(rspMyFactions?.data?.data && !rspMyFactions.error){
    data.factionRep = rspMyFactions.data.data
    const mf = data.factionRep?.map(f=>f.symbol)
    data.factions = factions.filter((f)=>mf?.includes(f.symbol))
    systemSymbols = systemSymbols.concat((data.factions||[]).map(f=>waypointToSystem(f.headquarters)))
  }
  if(rspMyContracts?.data?.data && !rspMyContracts.error){
    data.contracts = rspMyContracts.data.data
  }
  if(rspMyShips?.data?.data && !rspMyShips.error){
    data.ships = rspMyShips.data.data
    systemSymbols = systemSymbols.concat((data.ships||[]).map(s=>s.nav.systemSymbol))
  }
  if(gameInfo?.data && !gameInfo.error){
    data.info = gameInfo.data
  }

  systemSymbols=uniqueStringArray(systemSymbols);

  const rspSystems = await Promise.all(
    systemSymbols.map(sym=>getSystem(token,sym))
  );
  
  const rspWaypoints = await Promise.all(
    systemSymbols.map(sym=>getWaypoints(token,sym))
  );
  
  data.systems=[]
  rspSystems.forEach(rspSystem=>{
    if(rspSystem?.data?.data && !rspSystem.error){
      data.systems = data.systems?.concat(rspSystem.data.data)
    }
  })
  
  data.waypoints=[]
  rspWaypoints.forEach(rspWaypoint=>{
    if(rspWaypoint?.data?.data && !rspWaypoint.error){
      data.waypoints = data.waypoints?.concat(rspWaypoint.data.data)
    }
  })

  
  localStorage.setItem('token',token);
  localStorage.setItem('agent',JSON.stringify(data.agent) || '{}');
  localStorage.setItem('factionRep',JSON.stringify(data.factionRep) || '[]');
  localStorage.setItem('factions',JSON.stringify(data.factions) || '[]');
  localStorage.setItem('contracts',JSON.stringify(data.contracts) || '[]');
  localStorage.setItem('ships',JSON.stringify(data.ships) || '[]');
  localStorage.setItem('info',JSON.stringify(data.info) || '{}');
  localStorage.setItem('systemSymbols',JSON.stringify(systemSymbols) || '[]');
  localStorage.setItem('systems',JSON.stringify(data.systems) || '[]');
  localStorage.setItem('waypoints',JSON.stringify(data.waypoints) || '[]');

  
  return data
}


export async function getGameInfo(): Promise<ApiResponse|undefined>
{
  return(apiGeneric('GET',''))
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

export async function getSystems(token: string, limit:number, page:number): Promise<ApiResponse|undefined>
{
    return(apiGeneric('GET',`systems`,token,{},limit,page))
}

export async function getSystem(token: string, symbol?:string): Promise<ApiResponse|undefined>
{
    return(apiGeneric('GET',`systems/${symbol}`,token))
}

export async function getWaypoints(token: string, symbol?:string): Promise<ApiResponse|undefined>
{
    return(apiGeneric('GET',`systems/${symbol}/waypoints`,token))
}