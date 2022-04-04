import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authOperations";

export function UserMenu() {
  const dispatch = useDispatch();
  return (
    <button type="button" onClick={(e) => dispatch(logout())}>
      Logout
    </button>
  );
}
