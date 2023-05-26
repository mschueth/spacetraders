
import {WaypointTypeProps} from "../types/gameType";
import wpp from '../data/waypointTypeProps.json';
import { Waypoint } from "../types/generated";
import { toNumbersOnly } from "../util/validateUtil";
import { badgeColor } from "../util/formatUtil"

function castToWpTP(p:any): WaypointTypeProps{
    return p;
}


function wpName(name:string){
    return (name.split('-').slice(-1))[0];
  }

const WP_PROPS = wpp

export function getWaypointProps(wp:Waypoint){
    const wpp = WP_PROPS[wp.type]
    return {
        ...wpp,
        gen:{
            name:wpName(wp.type),
            color: wpp.color.base[parseInt(toNumbersOnly(wp.symbol)||'0') % wpp.color.base.length]||badgeColor(wpName(wp.type)),
            highlight: wpp.color.highlight[parseInt(toNumbersOnly(wp.symbol)||'0') % wpp.color.highlight.length]||'rgba(250,250,250,.75)',
            shadow: wpp.color.shadow[parseInt(toNumbersOnly(wp.symbol)||'0') % wpp.color.shadow.length]||'rgba(0,0,0,.75)',
            rotation: (parseInt(toNumbersOnly(wp.symbol)||'0')*1.33) % 360,
        }
    }

}