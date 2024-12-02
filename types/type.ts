export type Pokemon = {
    name: string;
    url: string;
};

export type DetailPokemon = {
    id: number,
    name: string,
    weight: number,
    height: number,
    abilities: string[],
    types: string[],
    stats: string[],
    evolution: string[],
    image: string,
    other_image: string[]
}