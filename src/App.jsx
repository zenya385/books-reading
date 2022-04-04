import "./index.css";
import React, { Suspense, lazy } from "react";
import { Redirect, Switch } from "react-router-dom";
import AppBar from "./components/navigation/AppBar";
import PrivateRoute from "./components/Routs/PrivateRoute";
import PublicRoute from "./components/Routs/PublicRoute";

const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const RegisterPage = lazy(() => import("./pages/RegisterPage.jsx"));
const LibraryPage = lazy(() => import("./pages/LibraryPage.jsx"));
const StatisticsPage = lazy(() => import("./pages/StatisticsPage.jsx"));
const TrainingPage = lazy(() => import("./pages/TrainingPage.jsx"));

export default function App() {
  return (
    <>
      <AppBar />

      <Suspense fallback={<h1>Wait a second, please =)</h1>}></Suspense>
    </>
  );
}
