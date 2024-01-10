import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import theme from "./components/theme";
import LoginPage from "./pages/Login/index";

function App() {
  return (
    <>
      <ThemeProvider theme={theme()}>
        < CssBaseline />
        < LoginPage />
      </ThemeProvider>
    </>
  )
}

export default App
