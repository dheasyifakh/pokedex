"use client";
import { typePokemon } from '@/types/typePokemon';
import { Grid } from '@material-ui/core';
import { Typography, Box, Chip, CircularProgress } from '@mui/material';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PokemonDetail: React.FC = () => {
  const pathname = usePathname(); // Get the full pathname, e.g., "pokemon/1"
  const [pokemonId, setPokemonId] = useState<string | null>(null);
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [evolution, setEvolution] = useState<any>(null);

  useEffect(() => {
    if (pathname) {
      const parts = pathname.split('/');
      const id = Number(parts[parts.length - 1]); // Convert to number
      if (!isNaN(id)) setPokemonId(id);
    }
  }, [pathname]);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        if (!pokemonId) return;

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPokemon(data);

        // Fetching the species to get the evolution chain URL
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        const evolutionChainUrl = speciesData.evolution_chain.url;

        // Fetching the evolution chain
        const evolutionResponse = await fetch(evolutionChainUrl);
        const evolutionData = await evolutionResponse.json();
        setEvolution(evolutionData.chain);

      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonDetail();
  }, [pokemonId]);

  const abilities = pokemon?.abilities.map((abilityObj: { ability: { name: string } }) => abilityObj.ability.name);
  const types = pokemon?.types.map((typeObj: { type: { name: string } }) => typeObj.type.name);
  const stats = pokemon?.stats;
  const sprites = pokemon?.sprites?.other?.["official-artwork"];
  const otherSprites = Object.values(pokemon?.sprites || {}).filter(
    (sprite) => typeof sprite === "string"
  );

  

  return (
    <div className='container'>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">{pokemon?.name}</Typography>
          <Box mt={2}>
            <Box display="flex" style={{ gap: '10rem' }}>
              <Typography variant="subtitle1">
                <strong>Weight:</strong> {pokemon?.weight}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Height:</strong> {pokemon?.height}
              </Typography>
            </Box>
            <Box mt={2} display="flex" style={{ gap: '3rem' }}>
              <Typography variant="subtitle1">
                <strong>Abilities:</strong>
              </Typography>
              <ul>
                {abilities?.map((ability: any, index: number) => (
                  <li key={index}>{ability}</li>
                ))}
              </ul>
            </Box>
            <Box mt={2} display="flex" style={{ gap: '3rem' }}>
              <Typography variant="subtitle1">
                <strong>Type:</strong>
              </Typography>
              <Box display="flex" flexWrap="wrap" style={{ gap: '0.5rem' }}>
                {types?.map((type: any, index: number) => (
                  <div key={index} className={`type-chip text-white`} style={typePokemon(type)}>
                    {type}
                  </div>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Other Images */}
      <Box mt={4}>
        <Typography variant="h6">Other Images:</Typography>
        <Box display="flex" gap="1rem" flexWrap="wrap">
          {otherSprites?.map((sprite, index) => (
            <img
              key={index}
              src={sprite as string}
              alt="sprite"
              style={{ width: "100px", height: "100px", borderRadius: "5px" }}
            />
          ))}
        </Box>
      </Box>

      {/* Stats */}
      <Box mt={4}>
        <Typography variant="h6">Stats:</Typography>
        <Box display="flex" justifyContent="space-around" mt={2}>
          {stats?.map((statObj: any, index: number) => (
            <Box key={index} display="flex" flexDirection="column" alignItems="center">
              <CircularProgress
                variant="determinate"
                value={statObj.base_stat}
                size={150}
                thickness={8}
                style={{ stroke: 'black' }}
              />
              <Typography variant="subtitle2">{statObj.stat.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      
    </div>
  );
};

export default PokemonDetail;
