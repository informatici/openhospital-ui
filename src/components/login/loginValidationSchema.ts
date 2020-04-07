import { object, string } from "yup";

export const loginValidationSchema = object({
  email: string()
    .email("Email address not valid")
    .required("Enter a valid email address"),
  password: string().required("Enter the password"),
});
