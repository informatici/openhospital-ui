import TimeAgo from "javascript-time-ago";

import de from "javascript-time-ago/locale/de";
import en from "javascript-time-ago/locale/en";
import fr from "javascript-time-ago/locale/fr";
import it from "javascript-time-ago/locale/it";
import sq from "javascript-time-ago/locale/sq";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(fr);
TimeAgo.addLocale(it);
TimeAgo.addLocale(de);
TimeAgo.addLocale(sq);

export function useTimeAgo() {
  const { i18n } = useTranslation();

  const timeAgo = useMemo(() => new TimeAgo(i18n.language), [i18n.language]);

  return { timeAgo };
}
