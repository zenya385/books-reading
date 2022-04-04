import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getIsLoggedIn } from "../../redux/auth/authSelectors";
import { UserMenu } from "./UserMenu";

const AppBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <header>
      {isLoggedIn ? (
        <UserMenu />
      ) : (
        <div>
          <NavLink to="/register" className="link" activeClassName="activeLink">
            Reg
          </NavLink>
          <NavLink to="/login" className="link" activeClassName="activeLink">
            Log
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default AppBar;
