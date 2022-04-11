import "./index.scss";
import React, { Suspense, lazy, useEffect } from "react";
import { Switch } from "react-router-dom";
import AppBar from "./components/navigation/AppBar";
import PrivateRoute from "./components/Routs/PrivateRoute";
import PublicRoute from "./components/Routs/PublicRoute";
import Container from "./components/Share/Container";
import GoogleLogin from "./components/Google/GoogleLogin";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "./redux/theme/themeSelector";
import { Redirect } from "react-router-dom";
import { getBooks } from "./redux/books/booksOperations";
import { getError } from "./redux/training/trainingSelectors";
import { getIsError } from "./redux/books/booksSelectors";
import { getIsErrorAuth } from "./redux/auth/authSelectors";
import { logout } from "./redux/auth/authOperations";

const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const RegisterPage = lazy(() => import("./pages/RegisterPage.jsx"));
const LibraryPage = lazy(() => import("./pages/LibraryPage.jsx"));
const TrainingPage = lazy(() => import("./pages/TrainingPage.jsx"));

export default function App() {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  const trainError = useSelector(getError);
  const booksError = useSelector(getIsError);
  const authError = useSelector(getIsErrorAuth);

  GoogleLogin();

  useEffect(() => {
    const err = authError;
    // && authError.slice(0, -3);
    console.log("err :>> ", err);
    // if (err === 401)
    //   //сплит через пробел абрать цыфры и привести к числу
    //   dispatch(logout());
  }, [trainError, booksError, authError]);

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  return (
    <div
    // style={{
    //   backgroundColor:
    //     theme === "light" ? "var(--light-theme)" : "var(--dark-theme)",
    //   color: theme === "light" ? "black" : "white",
    //   height: "100vh",
    // }}
    >
      <AppBar />
      <Suspense fallback={<h1>Wait a second, please =</h1>}>
        <Switch>
          <PublicRoute path="/register" redirectTo="/library" restricted>
            <RegisterPage />
          </PublicRoute>
          <PublicRoute path="/login" redirectTo="/library" restricted>
            <LoginPage />
          </PublicRoute>
          <Container>
            <PrivateRoute path="/library" redirectTo="/login">
              <LibraryPage />
            </PrivateRoute>
            <PrivateRoute path="/training" redirectTo="/login">
              <TrainingPage />
            </PrivateRoute>
          </Container>
          {/* <Redirect to="/" /> */}
        </Switch>
      </Suspense>
    </div>
  );
}
