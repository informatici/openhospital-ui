import { object, string } from "yup";
import { UserGroupDTO } from "../../../../../generated";
import { TFunction } from "react-i18next";

export const userGroupSchema = (t: TFunction<"translation">) =>
  object().shape<UserGroupDTO>({
    code: string().min(2).required(t("user.validateGroupCode")),
    desc: string(),
  });
