import { createTheme } from '@mui/material/styles';
import * as colors from '@mui/material/colors';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    MainContent: true;
  }
}


// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: 'dark',
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
  components: {
    MuiChip: {
      defaultProps: {
        size: "small",
      }
    },
  },
});

export default theme;