import { useLocalStorage } from "../../../libraries/hooks/useLocalStorage";
import { IUserSection } from "./types";

export const useUserSection = () => {
  const [value, setValue] = useLocalStorage("userSection", "admissions");

  const userSection: IUserSection = value as IUserSection;

  return [userSection, setValue];
};
