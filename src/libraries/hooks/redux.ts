import {
  useDispatch as useBaseDispatch,
  useSelector as useBaseSelector,
} from "react-redux";
import { AppDispatch, RootState } from "../../state/types";

export const useDispatch = useBaseDispatch.withTypes<AppDispatch>();
export const useSelector = useBaseSelector.withTypes<RootState>();
