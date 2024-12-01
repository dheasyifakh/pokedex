// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e6ab09", // Your custom primary color
      light: "#FF8A50", // Optional: Lighter shade
      dark: "#D84315",  // Optional: Darker shade
      contrastText: "#FFFFFF", // Optional: Text color on primary
    },
    secondary: {
      main: "#607D8B", // Optional: Custom secondary color
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif", // Optional: Custom font
  },
});

export default theme;
