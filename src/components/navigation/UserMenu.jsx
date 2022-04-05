import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/auth/authOperations";
import styles from "./UserMenu.module.css";

export function UserMenu() {
  const dispatch = useDispatch();
  return (
    <>
      <NavLink
        to="/training"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Training
      </NavLink>
      <NavLink
        to="/library"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Library
      </NavLink>
      <button type="button" onClick={(e) => dispatch(logout())}>
        Logout
      </button>
    </>
  );
}
