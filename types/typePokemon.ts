export const typePokemon = (type: string) =>{
    switch(type){
        case "normal":
            return{backgroundColor: '#e66d00'};
        case "fire":
            return{backgroundColor: 'rgba(222, 44, 44, 1)'};
        case "flying": 
            return{backgroundColor: 'rgba(1, 185, 86, 1)'};
        case "poison": 
            return{backgroundColor: 'rgba(227, 76, 136, 1)'};
        case "water": 
            return{backgroundColor: 'rgba(67, 80, 230, 1)'};
        case "bug": 
            return{backgroundColor: 'rgba(255, 175, 102, 1)'};
        default:
            return{}
    }
}
export const typePokemonBg = (type: string) =>{
    switch(type){
        case "normal":
            return{ background: "conic-gradient(from 180deg,transparent 180deg,#e66d00 180deg)"};
        case "fire":
            return{background: "conic-gradient(from 180deg,transparent 180deg,rgba(222, 44, 44, 1) 180deg)"};
        case "flying": 
            return{background: "conic-gradient(from 180deg,transparent 180deg,rgba(1, 185, 86, 1) 180deg)"};
        case "poison": 
            return{background: "conic-gradient(from 180deg,transparent 180deg,rgba(227, 76, 136, 1) 180deg)"};
        case "water": 
            return{background: "conic-gradient(from 180deg,transparent 180deg,rgba(67, 80, 230, 1) 180deg)"};
        case "bug": 
            return{background: "conic-gradient(from 180deg,transparent 180deg,rgba(255, 175, 102, 1) 180deg)"};
        default:
            return{}
    }
}