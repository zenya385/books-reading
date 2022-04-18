import React from "react";
import { ErrorMessage, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/authOperations";
import s from "./RegisterPage.module.scss";
import { regValidationSchema } from "../../utils/validation/RegisterValid";
import { getLang } from "../../redux/lang/langSelector";
import { langOptionsRegister } from "../../assets/langOptionsRegister";
import { getTheme } from "../../redux/theme/themeSelector";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const lang = useSelector(getLang);
  const theme = useSelector(getTheme);
  const {
    title,
    inputEmail,
    inputPass,
    inputPassConf,
    buttonReg,
    question,
    linkLog,
    textTitle1,
    text1_1,
    text1_2,
    text1_3,
    textTitle2,
    text2_1,
    text2_2,
    text2_3,
  } = langOptionsRegister;

  return (
    <div className={s.regForm}>
      <div className={s.LoginRegDiv}>
        <div className={s.regFormFormikGoogle}>
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
                  {title[lang]}
                  <span className={s.spanStar}>*</span>
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
                </label>

                <label className={s.inputLabel} htmlFor="email">
                  {inputEmail[lang]} <span className={s.spanStar}>*</span>
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
                </label>

                <label className={s.inputLabel} htmlFor="password">
                  {inputPass[lang]} <span className={s.spanStar}>*</span>
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
                </label>

                <label className={s.inputLabel} htmlFor="passwordRepeat">
                  {inputPassConf[lang]} <span className={s.spanStar}>*</span>
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
                    className={s.errorMessage}
                  />
                </label>

                <button
                  className={s.btnSubmit}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {buttonReg[lang]}
                </button>
                <div className={s.regFormRegistrText}>
                  <p className={s.btnRegisterSmallText}>{question[lang]}</p>
                  <Link className={s.btnRegisterLogin} to="/login">
                    {linkLog[lang]}
                  </Link>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>

      <div className={s.textRegist}>
        <div className={s.textRegistDiv}>
          <h2
            className={s.regFormTitleMain}
            style={{
              color: theme === "light" ? "var(--title-text-color)" : "white",
            }}
          >
            Books Reading
          </h2>
          <div>
            <div className={s.regFormTitleText}>
              <h3
                className={s.regFormTitle}
                style={{
                  color:
                    theme === "light" ? "var(--title-text-color)" : "white",
                }}
              >
                {textTitle1[lang]}
              </h3>
              <div className={s.regFormSpanText}>
                <span className={s.spanArrow}>&#62;</span>
                <p className={s.textFontRegistr}>{text1_1[lang]}</p>
              </div>
              <div className={s.regFormSpanText}>
                <span className={s.spanArrow}>&#62;</span>
                <p className={s.textFontRegistr}>{text1_2[lang]}</p>
              </div>
              <div className={s.regFormSpanText}>
                <span className={s.spanArrow}>&#62;</span>
                <p className={s.textFontRegistr}>{text1_3[lang]}</p>
              </div>
            </div>
            <div className={s.regFormTitleText}>
              <h3
                className={s.regFormTitle}
                style={{
                  color:
                    theme === "light" ? "var(--title-text-color)" : "white",
                }}
              >
                {textTitle2[lang]}
              </h3>
              <div className={s.regFormSpanText}>
                <span className={s.spanArrow}>&#62;</span>
                <p className={s.textFontRegistr}>{text2_1[lang]}</p>
              </div>
              <div className={s.regFormSpanText}>
                <span className={s.spanArrow}>&#62;</span>
                <p className={s.textFontRegistr}>{text2_2[lang]}</p>
              </div>
              <div className={s.regFormSpanText}>
                <span className={s.spanArrow}>&#62;</span>
                <p className={s.textFontRegistr}>{text2_3[lang]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
