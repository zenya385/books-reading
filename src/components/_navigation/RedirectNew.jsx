import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { getIsLoggedIn } from "../../redux/auth/authSelectors";

const RedirectNew = () => {
  const isAuth = useSelector(getIsLoggedIn);
  return <> {isAuth ? <Redirect to="/library" /> : <Redirect to="/login" />}</>;
};

export default RedirectNew;
