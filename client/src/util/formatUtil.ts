
import { BadgeColorHSL } from "./badgeColorUtil";


export function nameAbr(name:string){
    name??='';
    return name.split(/[\s,\-,\_]+/).map(n=>n.slice(0,1)).join('')
}

export function badgeColor(name:string){
    name??='';
    return (new BadgeColorHSL(name)).toString();
}

export function numberWithCommas(x:number) {
    x??=0;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
