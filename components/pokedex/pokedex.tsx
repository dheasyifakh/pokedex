"use client"
import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Stack, Typography, Button, Select, Pagination, MenuItem } from '@mui/material';
import { Pokemon } from '@/types/type';
import { typePokemon } from '@/types/typePokemon';
import ModalDetail from './modalDetail';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      background: 'rgba(255, 203, 59, 1)',
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
        boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        transform: "scale(1.1)"
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
    
  })
);

const PokedexPage: React.FC = () => {
  const classes = useStyles();
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [pokemonDetails, setPokemonDetails] = useState<{ id: number; types: string[]; image: string, weight:string, height:string }[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<null | any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemPerPage, setItemPerPage] = useState(9);

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
            const response = await fetch(pokemon.url);
            const data = await response.json();
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

  const totalPages = Math.ceil(pokemonDetails.length/itemPerPage);

  const currentPokemon = pokemonDetails.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  )

  const handlePrevious = () =>{
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () =>{
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className={`${classes.container} container`} >
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
        {currentPokemon.map((pokemon, index) => (
          <Box key={index} className={classes.card} onClick={() => handleOpen(pokemon)}>
            <img src={pokemon.image || "https://placehold.co/300"} alt="" style={{ width: '300px', height: '300px' }} />
            <Typography variant='body2' className={classes.pokeName} style={{ color: 'rgba(179, 182, 184, 1)' }}>#0{index + 1}</Typography>
            <Typography variant='h4' className={classes.pokeName}>{pokedex[pokemon.id - 1]?.name}</Typography>
            <div className={classes.pokeTypes}>
              {pokemon.types.map((type, i) => (
                <div key={i} className={`type-chip text-white`} style={typePokemon(type)}>
                  {type}
                </div>
              ))}
            </div>
          </Box>
        ))}
      </div>
      <ModalDetail open={open} handleClose={handleClose} selectedPokemon={selectedPokemon} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 0', marginTop: '1rem', color: 'white' }}>
        <div>
          <span>Per Page: </span>
          <Select
            value={itemPerPage}
            onChange={(e) => {
              setItemPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to the first page when changing items per page
            }}
          >
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={18}>18</MenuItem>
            <MenuItem value={27}>27</MenuItem>
          </Select>
        </div>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => setCurrentPage(page)}
          color="primary"
          siblingCount={1}
          boundaryCount={1}
          showFirstButton
          showLastButton
          variant="outlined" 
          shape="rounded"
        />
        <div>Total Data: {pokemonDetails.length}</div>
      </div>
    </div>
  );
};

export default PokedexPage;
