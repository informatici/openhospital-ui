import { TFunction } from "react-i18next";
import { boolean, object, string } from "yup";
import { UserGroupDTO } from "../../../../../generated";

export const userGroupSchema = (t: TFunction<"translation">) =>
  object().shape<UserGroupDTO>({
    code: string().min(2).required(t("user.validateGroupCode")),
    desc: string(),
    deleted: boolean(),
  });
