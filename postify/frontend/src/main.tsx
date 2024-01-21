import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import theme from './components/theme'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from '../src/App.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'
import LoginPage from './pages/Login/index.tsx'
import Register from './pages/Register/index.tsx'
import ErrorNotFound from './pages/errors/notFound.tsx'
import { ApiConfig } from './utils/api/api.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme()}>
      <CssBaseline />
      <ApiConfig />
      <BrowserRouter basename="/">
        <Routes>
          <Route
            index
            element={<LoginPage />}
            errorElement={<ErrorNotFound />}
          />
          <Route
            path={'/register'}
            element={<Register />}
            errorElement={<ErrorNotFound />}
          />
          <Route path="/" element={<PrivateRoute />}>
            <Route
              path="/home"
              element={<Home />}
              errorElement={<ErrorNotFound />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
