
import {
    WaypointTypeProps,
    SystemTypeProps,
} from "../types/gameType";
import wpp from '../data/waypointTypeProps.json';
import syp from '../data/systemTypeProps.json';
import { Waypoint, System } from "../types/generated";
import { toNumbersOnly } from "../util/validateUtil";
import { badgeColor } from "../util/formatUtil"

function castToWpTP(p:any): WaypointTypeProps{
    return p;
}

function castToSyTP(p:any): SystemTypeProps{
    return p;
}


function wpName(name:string){
    return (name.split('-').slice(-1))[0];
  }

const WP_PROPS = wpp
const SY_PROPS = syp

export function getWaypointProps(wp:Waypoint){
    const wpp = castToWpTP(WP_PROPS[wp.type]);
    const pseudoRand = Math.floor(parseInt(toNumbersOnly(wp.symbol)||'0') + (wp.x*wp.y*3.33));
    const pseudoRand2 = parseInt(toNumbersOnly(wp.symbol).slice(-3)||'1')
    const pseudoRand3 = pseudoRand * pseudoRand2 * 3.33
    const pseudoRand10 = pseudoRand3%10
    return {
        ...wpp,
        gen:{
            name:wpName(wp.type),
            color: wpp.color.base[pseudoRand % wpp.color.base.length]||badgeColor(wpName(wp.type)),
            highlight: wpp.color.highlight[pseudoRand % wpp.color.highlight.length]||'rgba(250,250,250,.75)',
            shadow: wpp.color.shadow[pseudoRand % wpp.color.shadow.length]||'rgba(0,0,0,.75)',
            rotation: (pseudoRand3) % 360,
            adjustForOrbit: (waypoints:Waypoint[])=>{
                let adj = 0;
                let p = waypoints.find(p=>(p.orbitals.map(o=>o.symbol)).includes(wp.symbol))
                if(p){
                  const pp = getWaypointProps(p);
                  adj = (pp.size.factor)*6 + (pseudoRand10)*.15
                }
                return adj;
            }
        }
    }

}

export function getSystemProps(sy:System){
    const syp = castToSyTP(SY_PROPS[sy.type]);
    const pseudoRand = Math.floor(parseInt(toNumbersOnly(sy.symbol)||'0') + (sy.x*sy.y*3.33));
    const pseudoRand2 = parseInt(toNumbersOnly(sy.symbol).slice(-3)||'1')
    const pseudoRand3 = pseudoRand * pseudoRand2 * 3.33
    return {
        ...syp,
        gen:{
            name:wpName(sy.type),
            color: syp.color.base[pseudoRand % syp.color.base.length]||badgeColor(wpName(sy.type)),
            highlight: syp.color.highlight[pseudoRand % syp.color.highlight.length]||'rgba(250,250,250,.75)',
            shadow: syp.color.shadow[pseudoRand % syp.color.shadow.length]||'rgba(0,0,0,.75)',
            rotation: (pseudoRand3) % 360
        }
    }

}
