export const getCreditCount  = (charCount : number, credit : string) => {
    if(!charCount || !credit){
        return 0;
    }
    return  Math.ceil( charCount / 140) * parseInt(credit) ;
}