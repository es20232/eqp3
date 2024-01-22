import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import theme from "./components/theme";
import "./index.css";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import Home from "../src/App.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import LoginPage from "./pages/Login/index.tsx";
import Register from "./pages/Register/index.tsx";
import ErrorNotFound from "./pages/errors/notFound.tsx";
import { ApiConfig } from "./utils/api/api.ts";
import { Profile, EditProfile } from "./pages/UserProfile/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
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
            path={"/register"}
            element={<Register />}
            errorElement={<ErrorNotFound />}
          />

          <Route path="/">
            <Route
              path="/home"
              element={<Home />}
              errorElement={<ErrorNotFound />}
            />
            <Route path="/profile" element={<Home />}>
              <Route
                index
                element={<Profile />}
                errorElement={<ErrorNotFound />}
              />
              <Route
                path="/profile/edit"
                element={<EditProfile />}
                errorElement={<ErrorNotFound />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
