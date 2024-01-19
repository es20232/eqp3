import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import theme from "./components/theme";
import "./index.css"

//Configuração do router
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//paginas
//import Home from './pages/Dashboard/index.tsx';
import Home from '../src/App.tsx';
import LoginPage from './pages/Login/index.tsx';
import Register from './pages/Register/index.tsx';
//import Profile from './pages/UserProfile/index.tsx';
import ErrorNotFound from './pages/errors/notFound.tsx';

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
    errorElement: < ErrorNotFound />,
    children: [
      {
        path: "/home",
        element: <ErrorNotFound/>
      },
      {
        path: "save",
        element: <ErrorNotFound/>
      },
      {
        path: "profile",
        element: <ErrorNotFound/>
      },
      {
        path: "post",
        element: <ErrorNotFound/>
      },
      {
        path: "search",
        element: <ErrorNotFound/>
      },
    ]
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