import { useCallback } from "react";
import { useTranslation as useBaseTranslation } from "react-i18next";
import { LocaleKey } from "resources/types";

export function useTranslation() {
  const { t } = useBaseTranslation();
  const translate = useCallback(
    (key: LocaleKey, context?: Record<string, any>) => t(key, context),
    [t]
  );

  return { t: translate };
}
