import { TFunction } from "react-i18next";
import { object, string } from "yup";
import { UserDTO, UserGroupDTO } from "../../../../../generated";

// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
export const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const userSchema = (t: TFunction<"translation">) =>
  object().shape<Pick<UserDTO, "userGroupName" | "passwd" | "desc">>({
    userGroupName: object<UserGroupDTO>({
      code: string().required(t("user.validateUserNeedsGroup")),
      desc: string(),
    })
      .nullable()
      .required(t("user.validateUserNeedsGroup")),
    passwd: string()
      .required(t("user.validatePasswordNeeded"))
      .min(5, t("user.validatePasswordTooShort"))
      .matches(passwordRules, {
        message: t("user.validatePasswordTooWeak"),
      }),
    desc: string(),
  });
