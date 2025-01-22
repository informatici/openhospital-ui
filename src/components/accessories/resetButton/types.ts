import { useFormik } from "formik";

export interface IProps {
  title?: string;
  formik: ReturnType<typeof useFormik>;
  isLoading?: boolean;
}
