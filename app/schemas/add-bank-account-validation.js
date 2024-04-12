import * as yup from "yup";

export const addBankAccountValidationSchema = yup
  .object({
    friendlyName: yup.string().required("Friendly name is required"),
    accountNumber: yup.string().required("Account Number is required"),
    routingNumber: yup.string().required("Routing Number is required"),
    accountType: yup.string().required("Account type must be selected"),
  })
  .required();
