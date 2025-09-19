import { SettingDTO } from "generated/models";

export const organizeByCategory = (
  settings: SettingDTO[]
): Record<string, SettingDTO[]> => {
  const categories: Record<string, SettingDTO[]> = {};

  if (settings.length > 0) {
    categories["all"] = settings;
  }

  settings.forEach((setting) => {
    if (categories[setting.category]) {
      categories[setting.category].push(setting);
    } else {
      categories[setting.category] = [setting];
    }
  });

  return categories;
};
