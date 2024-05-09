import * as yup from "yup";

export const signupValidationSchema = yup
  .object({
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .min(14, "Please verify your phone number")
      .max(14, "Please verify your phone number"),
    dob: yup.string().required("Date of birth is required"),
  })
  .required();
