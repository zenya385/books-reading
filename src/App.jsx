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
import Loader from "./components/Loader/Loader";
import { logoutUserApi } from "./utils/fetchApi";
import { logoutUser } from "./redux/auth/authSlice";

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
    const errArrAuth = authError && authError.split(" ");
    const Auth = errArrAuth && errArrAuth[errArrAuth.length - 1];
    console.log("Auth", Auth);

    const errArrTr = trainError && trainError.split(" ");
    const Train = errArrTr && errArrTr[errArrTr.length - 1];
    console.log("Train", Train);

    const errArrBook = booksError && booksError.split(" ");
    const Book = errArrBook && errArrBook[errArrBook.length - 1];
    console.log("Book", Book);

    if (Number(Auth) === 401 || Number(Train) === 401 || Number(Book) === 401) {
      dispatch(logoutUser());
      // console.log("first");
    }
  }, [authError, trainError, booksError]);

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  return (
    <div
      style={{
        backgroundColor:
          theme === "light" ? "var(--light-theme)" : "var(--dark-theme)",
        color: theme === "light" ? "black" : "white",
        // height: "100%",
        minHeight: "100vh",
      }}
    >
      <AppBar />
      <Suspense fallback={<Loader />}>
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
