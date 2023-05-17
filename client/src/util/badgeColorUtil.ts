/*
Thanks Piyush Kumar Baliyan
https://dev.to/admitkard/auto-generate-avatar-colors-randomly-138j
*/

const hRange = [0, 360];
const sRange = [50, 75];
const lRange = [25, 60];


const getHashOfString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    return hash;
};
  
const normalizeHash = (hash: number, min: number, max: number) => {
    return Math.floor((hash % (max - min)) + min);
};


export class BadgeColorHSL {
    name: string;
    h: number;
    s: number;
    l: number;

    constructor(name:string){
        name ??= '';
        this.name = name;
        const hash = getHashOfString(name);
        this.h = normalizeHash(hash, hRange[0], hRange[1]);
        this.s = normalizeHash(hash, sRange[0], sRange[1]);
        this.l = normalizeHash(hash, lRange[0], lRange[1]);
    }

    toString(){
        return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
    }
}

