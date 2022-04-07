import React from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authOperations";
import s from './LoginPage.module.scss'
import Container from "../components/Share/Container";
// import GoogleForm from '../components/GoogleForm/GoogleForm.jsx'
// import { Link } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();

  return (

      <div className={s.regForm}>
        <div className={s.LoginRegDiv}>
          <div className={s.regFormFormikGoogle}>
            <div className={s.googleFormDiv}>
            <a className={s.googleForm} href="https://bookread-backend.goit.global/auth/google">Google</a>
            </div>
              <Formik
                initialValues={{ email: "", password: "" }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                    errors.email = "Введите правильный электронный адрес";
                  }
                  return errors;
                }}
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
                  /* and other goodies */
                }) => (
                  <form
                    onSubmit={handleSubmit}
                  >
                    <label className={s.inputLabel} htmlFor="email">Електронна адреса <span className={s.spanStar}>*</span></label>
                    <input
                      className={s.inputEmail}
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />{errors.email && touched.email && errors.email}
                    <label className={s.inputLabel} htmlFor="password">Пароль <span className={s.spanStar}>*</span></label>
                    <input
                      className={s.inputPassword}
                      type="password"
                      name="password"
                      placeholder="..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password && touched.password && errors.password}
                    <button className={s.btnSubmit} type="submit" disabled={isSubmitting}>
                      Увiйти
                    </button>
                    <a className={s.btnRegisterLogin} href="/register">Реєстрацiя</a>
                  </form>
                )}
              </Formik>
          </div>
        </div>
        <div className={s.textLogin}>
          <p className={s.textFont}>Книги — это корабли мысли, странствующие по волнам времени и бережно несущие свой драгоценный груз от поколения к поколению. </p>
          <div className={s.lineBefore}>
            <p className={s.textAuthor}>Бэкон Ф.</p>
          </div>
        </div>
      </div>
  
    
  );
};

export default LoginPage;
