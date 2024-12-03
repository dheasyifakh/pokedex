"use client"
import { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { usePathname } from 'next/navigation';
import { Grid } from '@material-ui/core';
import Sidebar from '@/components/pokemon-type/Sidebar';
import PokemonList from '@/components/pokemon-type/PokemonList';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

interface Type {
  name: string;
}

const PokemonType = () => {
  const [types, setTypes] = useState<Type[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);
  const router = usePathname

  // Fetch all types
  useEffect(() => {
    const fetchTypes = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/type');
      const data = await response.json();
      setTypes(data.results);
    };
    fetchTypes();
  }, []);

  // Fetch Pokémon by type
  useEffect(() => {
    const fetchPokemon = async () => {
        if (!selectedType) return;
        const response = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
        const data = await response.json();
    
        // Map over Pokémon and fetch their details for official-artwork images
        const pokemonPromises = data.pokemon.slice(0, 50).map(async (p: any) => {
          const pokemonResponse = await fetch(p.pokemon.url);
          const pokemonData = await pokemonResponse.json();
          return {
            id: pokemonData.id,
            name: pokemonData.name,
            image: pokemonData.sprites.other["official-artwork"].front_default,
            types: pokemonData.types.map((t: any) => t.type.name),
          };
        });
    
        const pokemons = await Promise.all(pokemonPromises);
        setPokemon(pokemons);
      };
    
      fetchPokemon();
    }, [selectedType]);

  // Handle pagination
  const paginatedPokemon = pokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

 
  return (
    <div >
      <div className="half-doughnut top-left"></div>
      <div className="half-doughnut center-right"></div>
        <div className="container">
            <Grid container spacing={4}>
                <Grid item xs={12} md={4} style={{backgroundColor: "#ffffff94", zIndex: 1}}>
                    <Typography variant='h5'>Pokemon Type</Typography>
                    {types.map((type) => (
                        <Button
                            key={type.name}
                            onClick={() => {
                            setSelectedType(type.name);
                            setCurrentPage(1);
                            }}
                            style={{ display: 'block', margin: '0.5rem 0' }}
                        >
                            {type.name}
                        </Button>
                    ))}
                    {/* <Sidebar types={types} setSelectedType={setSelectedType} setCurrentPage={setCurrentPage}/> */}
                </Grid>
                <Grid item xs={12} md={8} style={{backgroundColor: "#ffffff94", zIndex: 1}}>
                    <div style={{padding: '1rem' }}>
                        <Typography variant="h4" gutterBottom>
                        Pokémon List
                        </Typography>
                        <TableContainer>
                        <Table>
                            <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Type</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {paginatedPokemon.map((pokemon, index) => (
                                <TableRow
                                key={pokemon.id}
                                //   onClick={() => router.push(`/pokemon/${pokemon.id}`)}
                                style={{ cursor: 'pointer' }}
                                >
                                <TableCell>
                                    <img
                                    src={pokemon.image || 'https://placehold.co/300'}
                                    alt={pokemon.name}
                                    style={{ width: '100px', height: '100px' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" style={{ color: 'rgba(179, 182, 184, 1)' }}>
                                    #{pokemon.id}
                                    </Typography>
                                    <Typography variant="h4">{pokemon.name}</Typography>
                                </TableCell>
                                <TableCell>
                                    {pokemon.types.map((type, i) => (
                                    <span
                                        key={i}
                                        style={{
                                        backgroundColor: '#607d8b',
                                        color: '#fff',
                                        borderRadius: '5px',
                                        padding: '0.2rem 0.5rem',
                                        margin: '0 0.2rem',
                                        }}
                                    >
                                        {type}
                                    </span>
                                    ))}
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>

                        {/* Pagination */}
                        <div style={{ marginTop: '1rem' }}>
                        <Button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                        >
                            Previous
                        </Button>
                        <Button
                            disabled={currentPage * itemsPerPage >= pokemon.length}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                        >
                            Next
                        </Button>
                        </div>
                    </div> 
                    {/* <PokemonList setCurrentPage={setCurrentPage} currentPage={currentPage} paginatedPokemon={paginatedPokemon} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage}/> */}
                </Grid>
            </Grid>
        </div>
      
    </div>
  );
};

export default PokemonType;
