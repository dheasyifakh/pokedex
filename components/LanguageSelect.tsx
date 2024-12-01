"use client"

// components/LanguageSelect.tsx
import React from "react";
import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

const LanguageSelect: React.FC = () => {
  const [language, setLanguage] = React.useState<string>("English");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLanguage(event.target.value as string);
  };

  return (
    <Box display="flex" alignItems="center">
      <LanguageIcon fontSize="small" sx={{ marginRight: "8px" }} />
      <FormControl variant="standard">
        <Select
          value={language}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Select Language" }}
          sx={{
            "& .MuiSelect-select": {
              padding: "8px 24px 8px 8px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#666",
            },
            "& .MuiSvgIcon-root": {
              color: "#666",
            },
          }}
        >
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="French">French</MenuItem>
          <MenuItem value="Spanish">Spanish</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelect;
