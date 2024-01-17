import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import theme from "./components/theme";

//Configuração do router
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//paginas
//import Home from './pages/Dashboard/index.tsx';
import Home from '../src/App.tsx';
import LoginPage from './pages/Login/index.tsx';
import Register from './pages/Register/index.tsx';
//import Profile from './pages/UserProfile/index.tsx';
import ErrorNotFound from './pages/errors/notFound.tsx';
import MenuBar from './pages/menuBar.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: < LoginPage />,
    errorElement: < ErrorNotFound />
  },
  {
    path: "/register",
    element: < Register />,
    errorElement: < ErrorNotFound />
  },
  {
    path: "/home",
    element: < Home />,
    errorElement: < ErrorNotFound />
  },
  /* {
    path: "/profile",
    element: < Profile />,
    errorElement: < ErrorNotFound />
  }, */
  {
    path: "/menu",
    element: < MenuBar />,
    errorElement: < ErrorNotFound />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme()}>
      < CssBaseline />
      < RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
