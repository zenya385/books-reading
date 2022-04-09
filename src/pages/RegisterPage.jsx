import React from "react";
import { ErrorMessage, Formik } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../redux/auth/authOperations";
import s from "./RegisterPage.module.scss";
import { regValidationSchema } from "../validation/RegisterValid";

const RegisterPage = () => {
  const dispatch = useDispatch();
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
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={regValidationSchema}
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
            }) => (
              <form onSubmit={handleSubmit}>
                <label className={s.inputLabel} htmlFor="name">
                  Iм'я <span className={s.spanStar}>*</span>
                </label>
                <input
                  className={s.inputEmail}
                  type="name"
                  name="name"
                  placeholder="..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {/* {errors.email && touched.email && errors.email} */}
                <ErrorMessage
                  component="div"
                  name="name"
                  className={s.errorMessage}
                />
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
                {/* {errors.email && touched.email && errors.email} */}
                <ErrorMessage
                  component="div"
                  name="email"
                  className={s.errorMessage}
                />
                <label className={s.inputLabel} htmlFor="password">
                  Пароль <span className={s.spanStar}>*</span>
                </label>
                <input
                  className={s.inputEmail}
                  type="password"
                  name="password"
                  placeholder="..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {/* {errors.password && touched.password && errors.password} */}
                <ErrorMessage
                  component="div"
                  name="password"
                  className={s.errorMessage}
                />
                <label className={s.inputLabel} htmlFor="passwordRepeat">
                  Пiдтвердити пароль <span className={s.spanStar}>*</span>
                </label>
                <input
                  className={s.inputPassword}
                  type="password"
                  name="confirmPassword"
                  placeholder="..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                {/* {errors.password && touched.password && errors.password} */}
                <ErrorMessage
                  component="div"
                  name="confirmPassword"
                  className={s.errorMessagePass}
                />
                <button
                  className={s.btnSubmit}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Зареєструватися
                </button>
                <p className={s.btnRegisterLogin}>
                  Вже з нами?
                  <a className={s.btnRegisterLogin} href="/login">
                    Увiйти
                  </a>
                </p>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <div className={s.textLogin}>
        <div className={s.regFormText}>
          <p className={s.textFont}>
            Книги — это корабли мысли, странствующие по волнам времени и бережно
            несущие свой драгоценный груз от поколения к поколению.{" "}
          </p>
          <div className={s.lineBefore}>
            <p className={s.textAuthor}>Бэкон Ф.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
