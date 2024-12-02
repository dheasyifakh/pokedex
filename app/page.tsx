"use client"
import React,{useRef} from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { Box, Typography, Button, Grid, } from '@mui/material';
import PokedexPage from "@/components/pokedex/pokedex";


export default function Home() {
  const pokedexRef = useRef<HTMLDivElement>(null);

  const handleScrollToPokedex = () => {
    pokedexRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div >
      <Box sx={{ paddingY: 6, paddingX: 4 }} className="container">
      <Grid container alignItems="center" spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            All the Pokémon data you'll ever need in one place!
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2, color: 'gray' }}>
            Thousands of data compiled into one place
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 3, textTransform: 'none', fontWeight: 'bold' }}
            onClick={handleScrollToPokedex}
          >
            Check PokéDex
          </Button>
        </Grid>
        <Grid item xs={12} md={6} style={{display: 'flex', justifyContent: 'end'}}>
          <img src={"../../../assets/img/image-hero.png"} alt="Pokemon Characters" style={{ width: '80%' }} />
        </Grid>
      </Grid>
    </Box>
    <div ref={pokedexRef}>
    <PokedexPage/>

    </div>
    </div>
  );
}
