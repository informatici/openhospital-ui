import { TFields } from "../../../../../libraries/formDataHandling/types";
import { UserDTO } from "../../../../../generated";

type UserProperties = keyof UserDTO;

export const getInitialFields: (
  user: UserDTO | undefined
) => TFields<UserProperties> = (user) => ({
  userName: { type: "text", value: user?.userName ?? "" },
  userGroupName: { type: "select", value: user?.userGroupName?.code ?? "" },
  passwd: { type: "text", value: user?.passwd ?? "" },
  desc: { type: "text", value: user?.desc ?? "" },
});
