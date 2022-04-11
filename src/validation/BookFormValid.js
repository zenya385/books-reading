import * as Yup from "yup";

export const addBookValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Fill the gap - title")
    .min(2, "Hmm...Too short")
    .max(254, "Ohh...Too long. Max 254"),
  author: Yup.string()
    .required("Fill the gap - author")
    .min(2, "Hmm...Too short")
    .max(254, "Ohh...Too long. Max 254")
    .typeError("Letters only"),
  publishYear: Yup.number()
    .required("Fill the gap")
    .min(1400, "To young!")
    // .moreThan(1000, "Are you sure?")
    .max(2023, "Future comes?!")
    .typeError("Only a number"),
  pagesTotal: Yup.number()
    .required("Fill the gap")
    .moreThan(0, "Are you sure?")
    .lessThan(5001, "Ohh...Max 5000"),
});
