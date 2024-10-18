import { TFunction } from "react-i18next";
import { object, ref, string } from "yup";
import { UserDTO, UserGroupDTO } from "../../../../../generated";

// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
export const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const userSchema = (t: TFunction<"translation">) =>
  object().shape<
    Pick<UserDTO, "userGroupName" | "desc"> & {
      passwd: string | undefined;
      passwd2: string | undefined;
    }
  >({
    userGroupName: object<UserGroupDTO>({
      code: string().required(t("user.validateUserNeedsGroup")),
      desc: string(),
    })
      .nullable()
      .required(t("user.validateUserNeedsGroup")),
    passwd: string()
      .notRequired()
      .min(5, t("user.validatePasswordTooShort"))
      .matches(passwordRules, {
        message: t("user.validatePasswordTooWeak"),
      }),
    passwd2: string()
      .oneOf([ref("passwd")], t("user.validatePasswordMustMatch"))
      .notRequired()
      .when("passwd", (passwd, schema) => {
        return !!passwd
          ? schema.required(t("user.validatePasswordNeeded"))
          : schema;
      }),
    desc: string(),
  });
