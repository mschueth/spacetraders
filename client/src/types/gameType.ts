
import { Agent } from './generated/agent';
import { Contract } from './generated/contract';
import { Faction } from './generated/faction';
import { Ship } from './generated/ship';

export type GameDataKey = 'token'|'agent'|'contracts'|'factions'|'factionRep'|'ships'|'notifications'
export type GameData = {
    token?:string;
    agent?:Agent,
    contracts?:Contract[],
    factions?: Faction[];
    factionRep?: {symbol: string, reputation: number}[]
    ships?: Ship[];
    notifications?:string[];
}

export type Account = {
    token:string;
    agent:Agent,
}

export type AccountDetails ={
    agent:Agent,
    token:string,
    faction:Faction,
}

export type ErrorMessageHTTP ={
    error:{
        code: number,
        data:{
            [key:string]:string[]
        }
        message:string,
    }
}