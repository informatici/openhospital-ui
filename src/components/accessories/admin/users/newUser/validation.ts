import { object, string } from "yup";
import { UserDTO, UserGroupDTO } from "../../../../../generated";

// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
export const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const userSchema = object().shape<UserDTO>({
  userName: string().min(2).required(),
  userGroupName: object<UserGroupDTO>({
    code: string().required("Each user should belong to a group"),
    desc: string(),
  })
    .nullable()
    .required("Each user should belong to a group"),
  passwd: string()
    .required("No password provided.")
    .min(5, "Password is too short - should be 5 chars minimum.")
    .matches(passwordRules, {
      message:
        "Please create a stronger password: 1 upper case letter, 1 lower case letter, 1 numeric digit",
    }),
  desc: string(),
});
