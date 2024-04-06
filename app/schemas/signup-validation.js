import * as yup from "yup";

export const signupValidationSchema = yup
  .object({
    firstName: yup
      .string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters long")
      .matches(
        /^[A-Za-z]+$/,
        "First name must not contain special characters or numbers"
      ),
    lastName: yup
      .string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters long")
      .matches(
        /^[A-Za-z]+$/,
        "Last name must not contain special characters or numbers"
      ),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .min(14, "Please verify your phone number")
      .max(14, "Please verify your phone number"),
    dateOfBirth: yup.string().required("Date of birth is required"),
  })
  .required();
