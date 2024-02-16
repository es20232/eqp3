import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import theme from "./components/theme";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../src/App.tsx";
import { SubmitRequest } from "./components/Auth/index.ts";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Feed from "./pages/Feed/index.tsx";
import LoginPage from "./pages/Login/index.tsx";
import Register from "./pages/Register/index.tsx";
import { EditProfile, Profile } from "./pages/UserProfile/index.tsx";
import ErrorNotFound from "./pages/errors/notFound.tsx";
import { ApiConfig } from "./utils/api/api.ts";

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
          />
          <Route
            path={'*'}
            element={<ErrorNotFound />}
          />
          <Route
            path={"/register"}
            element={<Register />}
          />
          <Route
            path={"/passwordRecovery"}
            element={<SubmitRequest type={"PASSWORDRECOVERY"} />}
          />

          <Route path="/" element={<PrivateRoute />}>
            <Route
              path="/home"
              element={<Home />}
              errorElement={<ErrorNotFound />}
            >
              <Route
                index
                element={<Feed />}
                errorElement={<ErrorNotFound />}
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
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
