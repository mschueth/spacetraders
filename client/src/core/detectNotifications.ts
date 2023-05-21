

import { GameData } from "../types/gameType"

export type Notification = {
    type:'fleet'|'reset'|'announcement'|'error',
    detected:Date,
    state:'new'|'seen'|'done',
    key:any
    message:string,
}

export function detectNotification(gd:GameData): Notification[]{

    const nowDt = new Date();

    if(gd.info){

    }

    return []
}