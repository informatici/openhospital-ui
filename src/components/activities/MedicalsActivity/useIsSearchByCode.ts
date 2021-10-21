import { useEffect, useState } from "react";
import { TFieldName } from "./types";

export const useIsSearchByCode = (formik: any): boolean => {
  const [isSearchById, setIsSearchByCode] = useState(false);
  const { setFieldTouched, setFieldValue, values } = formik;
  useEffect(() => {
    if (values.id === "") {
      setIsSearchByCode(false);
    } else {
      const keys: Array<TFieldName> = [
        "code",
        "prod_code",
        "type",
        "description",
      ];
      setIsSearchByCode(true);
      keys.forEach((key) => {
        if (key !== "code") {
          setFieldValue(key, "");
          setFieldTouched(key, false);
        }
      });
    }
  }, [values.code, setFieldTouched, setFieldValue]);
  return isSearchById;
};
