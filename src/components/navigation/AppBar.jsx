import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getIsLoggedIn, getUserName } from "../../redux/auth/authSelectors";
import { UserMenu } from "./UserMenu";
import styles from "./AppBar.module.scss";

const AppBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const userName = useSelector(getUserName);
  const firsLetter = userName && userName.split("")[0].toUpperCase();
  return (
    <header className={styles.header}>
      <div>
        <NavLink
          to="/login"
          exact
          className={styles.link}
          activeClassName={styles.activLink}
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
            <span className={styles.name}>{userName}</span>
          </div>
          <UserMenu />
        </div>
      )}
    </header>
  );
};

export default AppBar;
