import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getIsLoggedIn, getUserName } from "../../redux/auth/authSelectors";
import { UserMenu } from "./UserMenu";
import styles from "./AppBar.module.scss";
import SwitchTheme from "../SwitchTheme/SwitchTheme";
import { getTheme } from "../../redux/theme/themeSelector";
import SwitchLang from "../SwitchLang/SwitchLang";

const AppBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const userName = useSelector(getUserName);
  const firsLetter = userName && userName.split("")[0].toUpperCase();
  const theme = useSelector(getTheme);

  return (
    <header
      className={styles.header}
      style={{
        backgroundColor: theme === "light" ? "white" : "var(--dark-header)",
        color: theme === "light" ? "black" : "white",
      }}
    >
      <div>
        <NavLink
          to="/login"
          exact
          className={styles.link}
          activeClassName={styles.activLink}
          style={{
            color: theme === "light" ? "black" : "white",
          }}
        >
          BR
        </NavLink>
      </div>
      {isLoggedIn && (
        <div className={styles.flex}>
          <div className={styles.name_wrapper}>
            <div className={styles.letter_wrapper}>
              <span className={styles.firs_letter}>{firsLetter}</span>
            </div>
            <span
              className={styles.name}
              style={{
                color: theme === "light" ? "black" : "white",
              }}
            >
              {userName}
            </span>
          </div>
          <UserMenu />
        </div>
      )}
      <SwitchTheme />
      <SwitchLang />
    </header>
  );
};

export default AppBar;
