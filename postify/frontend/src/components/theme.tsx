import { createTheme } from '@mui/material/styles';

const cor_primaria = '#f5f5f5';
const cor_secundaria = '#0C4802';

export default function theme() {
    return createTheme({
        palette: {
            primary: {
                main: cor_secundaria
            },
            secondary: {
                main: cor_primaria
            },
            background: {
                default: "#0C1A09",
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                        background: cor_secundaria,
                        color: cor_primaria,
                        paddingLeft: '20px',
                        paddingRight: '20px'
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        borderColor: cor_secundaria,
                        borderWidth: '10px',
                        '& .MuiInputBase-input': {
                            height: '10px',
                        }
                    }
                }
            }
        },
    });
}
