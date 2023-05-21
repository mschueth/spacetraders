
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

export function formatDate(dt:Date|string,sep?:string){
    sep ??= '-'
    if(!!!dt){
        return '';
    }
    dt = new Date(dt);
    const y = dt.getUTCFullYear();
    const m = `00${dt.getUTCMonth()+1}`.slice(-2)
    const d = `00${dt.getUTCDate()}`.slice(-2)
    return [y,m,d].join(sep)
}

export function formatTime(dt:Date|string,sep?:string){
    sep ??= ':'
    if(!!!dt){
        return '';
    }
    dt = new Date(dt);
    const h = `00${dt.getUTCHours()}`.slice(-2)
    const m = `00${dt.getUTCMinutes()}`.slice(-2)
    const s = `00${dt.getUTCSeconds()}`.slice(-2)
    return [h,m,s].join(sep)
}

export function formatDateTime(dt:Date|string,dSep?:string,tSep?:string){
    if(!!!dt){
        return '';
    }
    return [
        formatDate(dt,dSep),
        formatTime(dt,tSep),
    ].join(' ');
}