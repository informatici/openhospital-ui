import * as _ from "lodash";
import en from "./i18n/en.json";
import it from "./i18n/it.json";
import ar from "./i18n/ar.json";
import de from "./i18n/de.json";
import es from "./i18n/es.json";
import fr from "./i18n/fr.json";
import pt from "./i18n/pt.json";
import zh from "./i18n/zh.json";
import sw from "./i18n/sw.json";
import sq from "./i18n/sq.json";
import cs from "./i18n/cs.json";
import am from "./i18n/am.json";
import custom_en from "../customization/i18n/custom_en.json";
import custom_it from "../customization/i18n/custom_it.json";
import custom_ar from "../customization/i18n/custom_ar.json";
import custom_de from "../customization/i18n/custom_de.json";
import custom_es from "../customization/i18n/custom_es.json";
import custom_fr from "../customization/i18n/custom_fr.json";
import custom_pt from "../customization/i18n/custom_pt.json";
import custom_zh from "../customization/i18n/custom_zh.json";
import custom_sw from "../customization/i18n/custom_sw.json";
import custom_sq from "../customization/i18n/custom_sq.json";
import custom_cs from "../customization/i18n/custom_cs.json";
import custom_am from "../customization/i18n/custom_am.json";

const resources = {
  en: { translation: _.merge(en, custom_en) },
  it: { translation: _.merge(it, custom_it) },
  ar: { translation: _.merge(ar, custom_ar) },
  de: { translation: _.merge(de, custom_de) },
  es: { translation: _.merge(es, custom_es) },
  fr: { translation: _.merge(fr, custom_fr) },
  pt: { translation: _.merge(pt, custom_pt) },
  zh: { translation: _.merge(zh, custom_zh) },
  sw: { translation: _.merge(sw, custom_sw) },
  sq: { translation: _.merge(sq, custom_sq) },
  cs: { translation: _.merge(cs, custom_cs) },
  am: { translation: _.merge(am, custom_am) },
};

export default resources;
