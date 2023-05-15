
import { BadgeColorHSL } from "./badgeColor";


export function nameAbr(name:string){
    return name.split(/[\s,\-,\_]+/).map(n=>n.slice(0,1)).join('')
}

export function badgeColor(name:string){
    return (new BadgeColorHSL(name)).toString();
}

export function numberWithCommas(x:number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
