import * as Yup from "yup";

export const regValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Fill the gap")
    .min(2, "Enter more than 2 characters")
    .max(254, "Must max 254"),
  email: Yup.string()
    .required("Fill the gap")
    .email("Please enter an email")
    .max(254, "Max 254"),
  password: Yup.string()
    .required("Fill the gap")
    .min(8, "Enter more than 8 characters")
    .max(100, "Max 100"),
  confirmPassword: Yup.string()
    .required("Fill the gap")
    .oneOf([Yup.ref("password"), null], "Passwords have to be the same!"),
});
