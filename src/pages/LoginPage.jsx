import React from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authOperations";
import GoogleForm from '../components/GoogleForm/GoogleForm.jsx'

const LoginPage = () => {
  const dispatch = useDispatch();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <GoogleForm/>
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
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label htmlFor="email">Електронна адреса</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              name="password"
              placeholder="...."
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Увiйти
            </button>
            <a href="/register">Реєстрацiя</a>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
