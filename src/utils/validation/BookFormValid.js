import * as Yup from "yup";

export const addBookValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Fill the gap")
    .min(2, "Hmm...Too short")
    .max(254, "Ohh...Too long. Max 254"),
  author: Yup.string()
    .required("Fill the gap")
    .min(2, "Hmm...Too short")
    .max(254, "Ohh...Too long. Max 254"),
  publishYear: Yup.number()
    .required("Fill the gap")
    .max(2023, "Future comes?!"),
  pagesTotal: Yup.number()
    .required("Fill the gap")
    .moreThan(0, "Are you sure?")
    .lessThan(5001, "Ouch...Max 5000"),
});
