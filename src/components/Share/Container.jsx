import React from "react";
import s from "./Container.module.scss";

export default function Container({ children }) {
  return <section className={s.container}> {children} </section>;
}
