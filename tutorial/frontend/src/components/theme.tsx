import { createTheme } from '@mui/material/styles';

export default function theme() {
  return createTheme({
    palette: {
        background: {
          default: '#f5f5f5', // Substitua '#f5f5f5' pela cor de fundo desejada
        },
      },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            marginRight: '10px',
          },
        },
      },
    },
  });
}
