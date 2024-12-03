"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  Pagination,
  MenuItem,
  Box,
  Button
} from "@mui/material";

interface Pokemon {
  length: number;
  map(arg0: (pokemon: any, index: number) => React.JSX.Element): React.ReactNode;
  id: number;
  name: string;
  image: string;
  types: string[];
}

interface PokemonProps {
    paginatedPokemon:Pokemon;
    setCurrentPage: (type: number | null) => void;
    currentPage: number;
    itemsPerPage: number;
    setItemsPerPage: (type: number | null) =>void;
}

const PokemonList: React.FC<PokemonProps> = 
    ({
        paginatedPokemon, 
        setCurrentPage,
        currentPage, 
        itemsPerPage,
        setItemsPerPage
    }) => {
  
  return (
    <div>
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
                {paginatedPokemon.map((pokemon:any, index:number) => (
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
                        #{index + 1}
                        </Typography>
                        <Typography variant="h4">{pokemon.name}</Typography>
                    </TableCell>
                    <TableCell>
                        {pokemon.types.map((type:any, i:number) => (
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
                onClick={() => setCurrentPage((prev: any) => prev - 1)}
            >
                Previous
            </Button>
            <Button
                disabled={currentPage * itemsPerPage >= paginatedPokemon.length}
                onClick={() => setCurrentPage((prev:any) => prev + 1)}
            >
                Next
            </Button>
            </div>
            {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 0', marginTop: '1rem', color: 'white' }}>
        <div>
          <span>Per Page: </span>
          <Select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to the first page when changing items per page
            }}
          >
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={18}>18</MenuItem>
            <MenuItem value={27}>27</MenuItem>
          </Select>
        </div>
        <Pagination
        //   count={totalPages}
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
        <div>Total Data: {paginatedPokemon.length}</div>
      </div> */}
        </div>
    </div>
  );
};

export default PokemonList;
