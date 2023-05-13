
import { Agent } from './agent';
import { Contract } from './contract';
import { Faction } from './faction';
import { Ship } from './ship';

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