import React from "react";
import s from './Container.module.css'

export default function Container({ children }) {

  return (
   <container className={s.container}> { children } </container>
  )   

}