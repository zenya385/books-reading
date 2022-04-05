import React from "react";
import { Formik, useFormik } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../redux/auth/authOperations";

const RegisterPage = () => {
  const dispatch = useDispatch();
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <h1>Google</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          dispatch(register(values));
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
            <label htmlFor="name">Iм'я</label>
            <input
              type="name"
              name="name"
              placeholder="...."
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.email && touched.email && errors.email}
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
            <label htmlFor="passwordRepeat">Пiдтвердити пароль</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="...."
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Зареєструватися
            </button>
            <p>
              Вже з нами?<a href="/login"> Увiйти</a>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
