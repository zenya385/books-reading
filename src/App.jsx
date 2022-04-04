import "./index.css";
import React, { Suspense, lazy } from "react";
import { useEffect } from "react";
import { Redirect, Switch } from "react-router-dom";
import { getCurrentUser } from "./redux/users/authOperations";
import AppBar from "./components/AppBar";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { getIsRefreshingCurrentUser } from "./redux/users/authSelectors";
import { getTheme } from "./redux/theme/themeSelector";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const RegisterPage = lazy(() => import("./pages/RegisterPage.jsx"));
const Contacts = lazy(() => import("./pages/ContactsPage.jsx"));

export default function App() {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  const isRefreshingCurrentUser = useSelector(getIsRefreshingCurrentUser);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      {!isRefreshingCurrentUser && (
        <div
          style={{
            backgroundColor: theme === "light" ? "rgb(243, 245, 239" : "black",
            color: theme === "light" ? "black" : "rgb(43, 145, 139)",
            height: "100vh",
          }}
        >
          <AppBar />

          <Suspense fallback={<h1>Wait a second, please =)</h1>}>
            <Switch>
              <PublicRoute exact path="/">
                <HomePage />
              </PublicRoute>
              <PublicRoute path="/register" restricted>
                <RegisterPage />
              </PublicRoute>
              <PublicRoute path="/login" redirectTo="/contacts" restricted>
                <LoginPage />
              </PublicRoute>
              <PrivateRoute path="/contacts" redirectTo="/login">
                <Contacts />
              </PrivateRoute>
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </div>
      )}
    </>
  );
}
