import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getIsLoggedIn } from "../../redux/auth/authSelectors";
import { UserMenu } from "./UserMenu";
import styles from "./AppBar.module.scss";
import SwitchTheme from "../SwitchTheme/SwitchTheme";

const AppBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <header className={styles.header}>
      <NavLink
        to="/login"
        exact
        className={styles.link}
        activeClassName={styles.activLink}
      >
        BR
      </NavLink>
      {isLoggedIn && <UserMenu />}
      <SwitchTheme />
    </header>
  );
};

export default AppBar;
