import React from "react";
import { ErrorMessage, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/authOperations";
import s from "./LoginPage.module.scss";
import { getTheme } from "../../redux/theme/themeSelector";
import { loginValidationSchema } from "../../utils/validation/LoginValid";
import { getLang } from "../../redux/lang/langSelector";
import { langOptionsLogin } from "../../assets/langOptionsLogin";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  const lang = useSelector(getLang);
  const {
    inputEmail,
    inputPassword,
    buttonLogin,
    linkReg,
    text,
    author,
  } = langOptionsLogin;

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
                  {inputEmail[lang]} <span className={s.spanStar}> *</span>
                  <input
                    className={s.inputEmail}
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {/* {touched.email && errors.email && alert(errors.email)} */}
                  <ErrorMessage
                    component="div"
                    name="email"
                    className={s.errorMessage}
                  />
                </label>

                <label className={s.inputLabel} htmlFor="password">
                  {inputPassword[lang]}
                  <span className={s.spanStar}> *</span>
                  <input
                    className={s.inputPassword}
                    type="password"
                    name="password"
                    placeholder="..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {/* {touched.password && errors.password && alert(errors.password)} */}
                  <ErrorMessage
                    component="div"
                    name="password"
                    className={s.errorMessage}
                  />
                </label>

                <button
                  className={s.btnSubmit}
                  type="submit"
                  // disabled={isSubmitting}
                >
                  {buttonLogin[lang]}
                </button>
                <Link className={s.btnRegisterLogin} to="/register">
                  {linkReg[lang]}
                </Link>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <div className={s.textLogin}>
        <p
          className={s.textFont}
          style={{
            color: theme === "light" ? "var(--title-text-color)" : "white",
          }}
        >
          {text[lang]}
        </p>
        <div className={s.lineBefore}>
          <p className={s.textAuthor}>{author[lang]}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
