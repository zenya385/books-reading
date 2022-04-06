import "./index.css";
import React, { Suspense, lazy } from "react";
import { Redirect, Switch } from "react-router-dom";
import AppBar from "./components/navigation/AppBar";
import PrivateRoute from "./components/Routs/PrivateRoute";
import PublicRoute from "./components/Routs/PublicRoute";
import { Route } from "react-router-dom";
import BookInfoList from "./components/BookInfoList/BookInfoList";

const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const RegisterPage = lazy(() => import("./pages/RegisterPage.jsx"));
const LibraryPage = lazy(() => import("./pages/LibraryPage.jsx"));
const TrainingPage = lazy(() => import("./pages/TrainingPage.jsx"));

export default function App() {
  return (
    <>
      <AppBar />

      <Suspense fallback={<h1>Wait a second, please =</h1>}>
        <Switch>
          <PublicRoute path="/register" redirectTo="/library" restricted>
            <RegisterPage />
          </PublicRoute>
          <PublicRoute path="/login" redirectTo="/library" restricted>
            <LoginPage />
          </PublicRoute>
          <PrivateRoute path="/library" redirectTo="/login">
            <LibraryPage />
          </PrivateRoute>
          <PrivateRoute path="/training" redirectTo="/login">
            <TrainingPage />
          </PrivateRoute>
          <Redirect to="/register" />
        </Switch>
      </Suspense>
    </>
  );
}
