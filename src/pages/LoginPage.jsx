import React from "react";
import { ErrorMessage, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/auth/authOperations";
import s from "./LoginPage.module.scss";
import { getTheme } from "../redux/theme/themeSelector";
import { loginValidationSchema } from "../validation/LoginValid";

const LoginPage = () => {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);

  return (
    <div className={s.regForm}>
      <div className={s.LoginRegDiv}>
        <div className={s.regFormFormikGoogle}>
          <div className={s.googleFormDiv}>
            <a
              className={s.googleForm}
              href="https://bookread-backend.goit.global/auth/google"
            >
              Google
            </a>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={(values, { resetForm }) => {
              dispatch(login(values));
              resetForm();
              // console.log("values", values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <label className={s.inputLabel} htmlFor="email">
                  Електронна адреса <span className={s.spanStar}>*</span>
                </label>
                <input
                  className={s.inputEmail}
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <ErrorMessage
                  component="div"
                  name="email"
                  style={{ fontSize: "18px", color: "red" }}
                  className={s.errorMessage}
                />
                <label className={s.inputLabel} htmlFor="password">
                  Пароль <span className={s.spanStar}>*</span>
                </label>
                <input
                  className={s.inputPassword}
                  type="password"
                  name="password"
                  placeholder="..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <ErrorMessage
                  component="div"
                  name="password"
                  className={s.errorMessagePass}
                />
                <button
                  className={s.btnSubmit}
                  type="submit"
                  // disabled={isSubmitting}
                >
                  Увiйти
                </button>
                <a className={s.btnRegisterLogin} href="/register">
                  Реєстрацiя
                </a>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <div className={s.textLogin}>
        <p
          className={s.textFont}
          // style={{
          //   color: theme === "light" ? "black" : "white",
          // }}
        >
          Книги — это корабли мысли, странствующие по волнам времени и бережно
          несущие свой драгоценный груз от поколения к поколению.
        </p>
        <div className={s.lineBefore}>
          <p
            className={s.textAuthor}
          >
            Бэкон Ф.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
