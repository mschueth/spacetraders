import { createTheme } from '@mui/material/styles';
import * as colors from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: colors.blue[400],
    },
    secondary: {
      main: colors.deepOrange[500],
    },
    error: {
      main: colors.red[400],
    },
  },
});

export default theme;