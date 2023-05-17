

export function isValidAccountSymbol(symbol:string){
    return symbol.match(/[0-9A-Z,\-,\_]+$/);
}

export function toValidAccountSymbol(symbol:string){
    return symbol.toUpperCase().replaceAll(/[^0-9A-Z,\-,\_]+/g,'').slice(0,14);
}