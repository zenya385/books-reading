import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
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
});
