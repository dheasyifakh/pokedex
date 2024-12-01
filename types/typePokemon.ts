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