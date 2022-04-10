import * as Yup from "yup";

export const regValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Enter more than 2 characters")
    .max(254, "Must max 254")
    .required(),
  email: Yup.string()
    .required()
    .min(2, "Please enter an email: min 2")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Input valid data"
    )
    .max(254, "Max 254"),
  password: Yup.string()
    .min(8, "Enter more than 8 characters")
    .max(100, "Max 100")
    .required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords have to be the same!"),
});
