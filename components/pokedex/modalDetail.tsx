import React, { useState } from 'react';
import { Box, Button, Modal, Typography, Chip } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { typePokemon } from '@/types/typePokemon';
import Link from 'next/link';

const ModalDetail = ({
  open,
  handleClose,
  selectedPokemon,
}: {
  open: boolean;
  handleClose: () => void;
  selectedPokemon: {
    id: number,
    name: string;
    weight: number;
    height: number;
    abilities: string[];
    types: string[];
    image: string;
} | null;
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: "10px 20px 20px",
        }}
      >
        {selectedPokemon && (
          <>
          <Box mt={2} display="flex" justifyContent="flex-end">
              <Button onClick={handleClose}>
                &times;
              </Button>
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <img
                  src={selectedPokemon.image || 'https://placehold.co/300'}
                  alt=""
                  style={{ width: '250px', height: '250px' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4">{selectedPokemon.name}</Typography>
                <Box mt={2}>
                  <Box display="flex" style={{gap: '1rem'}}>
                  <Typography variant="subtitle1">
                    <strong>Weight:</strong> {selectedPokemon.weight}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Height:</strong> {selectedPokemon.height}
                  </Typography>
                  </Box>
                  
                  <Box mt={2}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1">
                          <strong>Abilities:</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <ul>
                      {selectedPokemon.abilities.map((ability, index) => (
                        <li key={index}>{ability}</li>
                      ))}
                      </ul>
                      </Grid>
                    </Grid>
                    
                  </Box>
                  <Box mt={2} display="flex" style={{gap: '1rem'}}>
                    <Typography variant="subtitle1">
                      <strong>Type:</strong>
                    </Typography>
                    <Box display="flex" flexWrap="wrap" style={{gap: '0.5rem'}}>
                      {selectedPokemon.types.map((type, index) => (
                        <Chip
                          key={index}
                          label={type}
                          style={typePokemon(type)}
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box mt={2}>
                    <Link href={`/pokemon/${selectedPokemon.id}`} color='primary'>
                      More Detail
                    </Link >
                  </Box>
                </Box>
              </Grid>
            </Grid>
            
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ModalDetail;