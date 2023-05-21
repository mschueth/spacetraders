
import { Agent } from './generated/agent';
import { Contract } from './generated/contract';
import { Faction } from './generated/faction';
import { Ship } from './generated/ship'
import { System } from './generated/system';

export type GameDataKey = 'token'|'info'|'agent'|'contracts'|'factions'|'factionRep'|'ships'|'notifications'|'systems'
export type GameData = {
    token?:string,
    agent?:Agent,
    contracts?:Contract[],
    factions?: Faction[],
    factionRep?: {symbol: string, reputation: number}[],
    ships?: Ship[],
    notifications?:string[],
    info?:GameInfo,
    systems?:System[],
}

export type Account = {
    token:string,
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

export type GameInfo = {
    status: string,
    version: string,
    resetDate: string|Date,
    description: string,
    stats: {
        agents: number,
        ships: number,
        systems: number,
        waypoints: number
    },
    leaderboards: {
        mostCredits: {
            agentSymbol:string, 
            credits:number,
        }[],
        mostSubmittedCharts:{
            agentSymbol:string, 
            chartCount:number,
        }[],
    },
    serverResets: {
        next: string|Date,
        frequency: string,
    },
    announcements: {
        title: string,
        body: string,
    }[],
    links: {
        name: string,
        url: string,
    }[]
}