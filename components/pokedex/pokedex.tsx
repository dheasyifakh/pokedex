"use client"
import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Stack, Typography } from '@mui/material';
import { Pokemon } from '@/types/type';
import { typePokemon } from '@/types/typePokemon';
import ModalDetail from './modalDetail';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      background: 'rgba(255, 203, 59, 1)',
      padding: theme.spacing(2),
    },
    pokedex: {
      marginTop: '2rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: theme.spacing(10),
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      padding: '2rem',
      transition: "box-shadow 0.3s ease",
      cursor: "pointer",
      "&:hover": {
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
      }
    },
    pokeName: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(1),
    },
    pokeTypes: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: theme.spacing(1),
    },
    typeChip: {
      padding: theme.spacing(0.5, 1),
      borderRadius: theme.spacing(1),
      backgroundColor: 'gray',
      color: 'white',
      fontSize: '0.875rem',
    },
  })
);

const PokedexPage: React.FC = () => {
  const classes = useStyles();
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [pokemonDetails, setPokemonDetails] = useState<{ id: number; types: string[]; image: string, weight:string, height:string }[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<null | any>(null);

  // Fetch Pokémon list once
  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon");
        const data = await response.json();
        setPokedex(data.results);
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []); 

  useEffect(() => {
    if (pokedex.length === 0) return; 

    const fetchPokemonDetails = async () => {
      try {
        const details = await Promise.all(
          pokedex.map(async (pokemon, index) => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return {
              id: index + 1,
              name: data.name,
              image: data.sprites.other["official-artwork"].front_default || "",
              types: data.types.map((typeObj: { type: { name: string } }) => typeObj.type.name),
              abilities: data.abilities.map(
                (abilityObj: { ability: { name: string } }) => abilityObj.ability.name
              ),
              weight: data.weight,
              height: data.height
            };
          })
        );
        setPokemonDetails(details);
      } catch (error) {
        console.error("Failed to fetch Pokémon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [pokedex]); // Dependency only on pokedex, runs once after it's updated

  const handleOpen = (pokemon: any) => {
    setSelectedPokemon(pokemon);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPokemon(null);
  };

  if (loading) return <div>Loading...</div>;

  console.log(selectedPokemon)
  return (
    <div className={classes.container} style={{ padding: '3rem 9rem' }}>
      <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h3" style={{ fontWeight: '700', color: 'rgba(66, 73, 77, 1)' }}>PokéDex</Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "center", alignItems: "center" }}
        style={{ textAlign: 'center' }}
      >
        <Typography variant='subtitle1'>All Generation totaling <br />999999 Pokemon</Typography>
      </Stack>

      <div className={classes.pokedex}>
        {pokemonDetails.map((pokemon, index) => (
          <Box key={index} className={classes.card} onClick={() => handleOpen(pokemon)}>
            <img src={pokemon.image || "https://placehold.co/300"} alt="" style={{ width: '300px', height: '300px' }} />
            <Typography variant='body2' className={classes.pokeName} style={{ color: 'rgba(179, 182, 184, 1)' }}>#0{index + 1}</Typography>
            <Typography variant='h4' className={classes.pokeName}>{pokedex[pokemon.id - 1]?.name}</Typography>
            <div className={classes.pokeTypes}>
              {pokemon.types.map((type, i) => (
                <div key={i} className={`${classes.typeChip} text-white`} style={typePokemon(type)}>
                  {type}
                </div>
              ))}
            </div>
          </Box>
        ))}
      </div>
      <ModalDetail open={open} handleClose={handleClose} selectedPokemon={selectedPokemon} />
    </div>
  );
};

export default PokedexPage;
