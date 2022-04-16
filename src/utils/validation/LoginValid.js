import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Fill the gap")
    .email("Please enter an email")
    .max(254, "Max 254"),
  password: Yup.string()
    .required("Fill the gap")
    .min(8, "Enter more than 8 characters")
    .max(100, "Max 100"),
});
