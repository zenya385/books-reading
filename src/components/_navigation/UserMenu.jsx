import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { logout } from "../../redux/auth/authOperations";
import styles from "./UserMenu.module.scss";
import Icons from "../../images/symbol-defs.svg";
import { getLang } from "../../redux/lang/langSelector";
import { langOptionsUserMenu } from "../../assets/langOptionsUserMenu";
import { getTheme } from "../../redux/theme/themeSelector";

export function UserMenu() {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  const lang = useSelector(getLang);
  const { btn } = langOptionsUserMenu;

  return (
    <div className={styles.user_menu}>
      <NavLink
        to="/training"
        className={styles.link_training}
        activeClassName={styles.activeLink}
      >
        <svg className={styles.book__icon} width="22px" height="17px">
          <use xlinkHref={`${Icons}#icon-flat-grey`} />
        </svg>
      </NavLink>
      <NavLink
        to="/library"
        className={styles.link_library}
        activeClassName={styles.activeLink}
      >
        <svg className={styles.home__icon} width="20px" height="17px">
          <use xlinkHref={`${Icons}#icon-icon-home`} />
        </svg>
      </NavLink>

      <span className={styles.line}></span>

      <Link
        to="/login"
        type="button"
        className={styles.logout_btb}
        onClick={(e) => dispatch(logout())}
        style={{
          backgroundColor: theme === "light" ? "white" : "var(--dark-header)",
          color: theme === "light" ? "#242a37" : "white",
        }}
      >
        {btn[lang]}
      </Link>
    </div>
  );
}
