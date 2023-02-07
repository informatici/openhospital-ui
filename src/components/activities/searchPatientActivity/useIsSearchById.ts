import { useEffect, useState } from "react";
import { TFieldName } from "./types";

export const useIsSearchById = (formik: any): boolean => {
  const [isSearchById, setIsSearchById] = useState(false);
  const { setFieldTouched, setFieldValue, values } = formik;
  useEffect(() => {
    if (values.id === "") {
      setIsSearchById(false);
    } else {
      const keys: Array<TFieldName> = [
        "id",
        "firstName",
        "secondName",
        "birthDate",
        "address",
      ];
      setIsSearchById(true);
      keys.forEach((key) => {
        if (key !== "id") {
          setFieldValue(key, "");
          setFieldTouched(key, false);
        }
      });
    }
  }, [values.id, setFieldTouched, setFieldValue]);
  return isSearchById;
};
