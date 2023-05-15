import { createTheme } from '@mui/material/styles';
import * as colors from '@mui/material/colors';

// declare module '@mui/material/Button' {
//   interface ButtonPropsVariantOverrides {
//     SubmitForm: true;
//   }
// }


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
    // MuiButton: {
    //   variants:[
    //     {
    //       props: { 
    //         variant: 'SubmitForm',
    //         fullWidth:true,
    //         sx:{ mt: 3, mb: 2 }
    //       },
    //       style:{},
    //     }
    //   ]
    // }
  },
});

export default theme;