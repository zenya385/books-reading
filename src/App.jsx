import "./index.css";
// import React from "react";

import React, { Suspense, lazy } from "react";
import { Redirect, Switch } from "react-router-dom";
import AppBar from "./components/navigation/AppBar";
import PrivateRoute from "./components/Routs/PrivateRoute";
import PublicRoute from "./components/Routs/PublicRoute";
import { Route } from "react-router-dom";
import BookInfoList from "./components/BookInfoList/BookInfoList";
// import TimerLogicOfYear from "./components/Timer/TimerLogicOfYear/TimerLogicOfYear";
// import TimerLogicOfGoals from "./components/Timer/TimerLogicOfGoals/TimerLogicOfGoals";
import Timer from "./components/Timer/timer/Timer";

const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const RegisterPage = lazy(() => import("./pages/RegisterPage.jsx"));
const LibraryPage = lazy(() => import("./pages/LibraryPage.jsx"));
const TrainingPage = lazy(() => import("./pages/TrainingPage.jsx"));

export default function App() {
  return (
    <>
      <AppBar />
      <Timer />

      <Suspense fallback={<h1>Wait a second, please =)</h1>}>
        <Switch>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/library">
            <LibraryPage />
          </Route>
          <Route path="/training">
            <TrainingPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </>
  );
}
