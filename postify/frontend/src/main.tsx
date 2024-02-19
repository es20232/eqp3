import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import theme from './components/theme'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from '../src/App.tsx'
import {
  PasswordRecovery,
  SubmitRequest,
  VerifiedEmail,
} from './components/Auth/index.ts'
import PrivateRoute from './components/PrivateRoute.tsx'
import Feed from './pages/Feed/Feed.tsx'
import LoginPage from './pages/Login/index.tsx'
import Register from './pages/Register/index.tsx'
import Search from "./pages/Search/index.tsx"
import { EditProfile, Profile } from './pages/UserProfile/index.tsx'
import ErrorNotFound from './pages/errors/notFound.tsx'
import { ApiConfig } from './utils/api/api.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme()}>
      <CssBaseline />
      <ApiConfig />
      <BrowserRouter basename="/">
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path={'*'} element={<ErrorNotFound />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/password-recovery'} element={<SubmitRequest />} />
          <Route
            path={'/password-recovery/change/:token'}
            element={<PasswordRecovery />}
          />
          <Route path={'/verified-email'} element={<VerifiedEmail />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route
              path="/home"
              element={<Home />}
              errorElement={<ErrorNotFound />}
            >
              <Route
                index
                element={<Feed />}
              />
            </Route>
            <Route path="/profile" element={<Home />}>
              <Route
                index
                element={<Profile />}
              />
              <Route
                path="/profile/edit"
                element={<EditProfile />}
              />
              <Route path=":username" element={<Profile />} />
            </Route>
            <Route path="/search" element={<Home />}>
              <Route
                index
                element={<Search />}
                errorElement={<ErrorNotFound />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
