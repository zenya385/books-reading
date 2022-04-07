import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getIsLoggedIn } from "../../redux/auth/authSelectors";
import { UserMenu } from "./UserMenu";
import styles from "./AppBar.module.scss";

const AppBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <header className={styles.header}>
      {!isLoggedIn ? (
        <NavLink
          to="/login"
          exact
          className={styles.link}
          activeClassName={styles.activLink}
        >
          BR
        </NavLink>
      ) : (
        <UserMenu />
      )}
      {/* (
         <div>
           <NavLink to="/register" className="link" activeClassName="activeLink">
             Reg
          </NavLink>
          <NavLink to="/login" className="link" activeClassName="activeLink">
             Log
           </NavLink>
       </div>
      ) */}
    </header>
  );
};

export default AppBar;
