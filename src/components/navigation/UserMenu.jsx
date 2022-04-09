import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/auth/authOperations";
import styles from "./UserMenu.module.scss";
import Icons from "../../images/symbol-defs.svg";
import { getLang } from "../../redux/lang/langSelector";
import { langOptionsUserMenu } from "../../assets/langOptionsUserMenu";

export function UserMenu() {
  const dispatch = useDispatch();
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
      <button
        type="button"
        className={styles.logout_btb}
        onClick={(e) => dispatch(logout())}
      >
        {btn[lang]}
      </button>
    </div>
  );
}
