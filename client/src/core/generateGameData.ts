
import {WaypointTypeProps} from "../types/gameType";
import wpp from '../data/waypointTypeProps.json';
import { Waypoint } from "../types/generated";

function castToWpTP(p:any): WaypointTypeProps{
    return p;
}

const WP_PROPS = wpp

export function getWaypointProps(wp:Waypoint){
    return WP_PROPS[wp.type]

}