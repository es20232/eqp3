import { createTheme } from '@mui/material/styles'

const corPrimaria = '#f5f5f5'
const corSecundaria = '#0C4802'

export default function theme() {
  return createTheme({
    palette: {
      primary: {
        main: corSecundaria,
      },
      secondary: {
        main: corPrimaria,
      },
      background: {
        default: '#0C1A09',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            background: corSecundaria,
            color: corPrimaria,
            paddingLeft: '20px',
            paddingRight: '20px',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            borderColor: corSecundaria,
            borderWidth: '10px',
            '& .MuiInputBase-input': {
              height: '10px',
            },
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: `
          .link {
            color: corPrimaria;
          }
        `,
      },
    },
  })
}
