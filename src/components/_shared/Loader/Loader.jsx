import React from "react";
import { Oval } from "react-loader-spinner";
import s from "./Loader.module.scss";
function Loader() {
  return (
    <div className={s.spinLoader}>
      <Oval color="#287e9b" height={100} width={100} />;
    </div>
  );
}
export default Loader;
