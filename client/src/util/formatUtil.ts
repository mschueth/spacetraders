
import { BadgeColorHSL } from "./badgeColorUtil";


export function nameAbr(name?:string){
    name??='';
    return name.split(/[\s,\-,\_]+/).map(n=>n.slice(0,1)).join('')
}

export function badgeColor(name?:string){
    name??='';
    return (new BadgeColorHSL(name)).toString();
}

export function numberWithCommas(x?:number) {
    x??=0;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function waypointToSystem(waypointSymbol:string){
    const [a,b,c] = waypointSymbol.split('-')
    return [a,b].join('-')
}

export function uniqueStringArray(a:string[]) {
    return [...new Set(a)];
}

export function toFirstCharUpper(str:string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function toWordFirstCharUpper(str:string) {
    return str.split(/[\s]/).map(s=>toFirstCharUpper(s)).join(' ')
}