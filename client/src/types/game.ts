
import { Agent } from './generated/agent';
import { Contract } from './generated/contract';
import { Faction } from './generated/faction';
import { Ship } from './generated/ship';

export type GameData = {
    token?:string;
    agent?:Agent,
    contract?:Contract,
    faction?: Faction;
    ship?: Ship;
}

export type Account = {
    token:string;
    agent:Agent,
}

export type Game ={
    accounts: Account[],
    data: GameData,
}