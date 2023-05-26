

export function isValidAccountSymbol(symbol:string){
    return symbol.match(/[0-9A-Z,\-,\_]+$/);
}

export function toValidAccountSymbol(symbol:string){
    return symbol.toUpperCase().replaceAll(/[^0-9A-Z,\-,\_]+/g,'').slice(0,14);
}

export function isNumbersOnly(str:string){
    return str.match(/[^0-9]+$/g);
}

export function toNumbersOnly(str:string){
    return str.replaceAll(/[^0-9]+/g,'');
}
