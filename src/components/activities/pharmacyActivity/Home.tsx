import { MedicalServices, Medication, SyncAlt } from "@mui/icons-material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import LargeButton from "../../accessories/largeButton/LargeButton";

const actions = [
  { icon: Medication, key: "pharmaceutical" },
  { icon: MedicalServices, key: "pharmaceutical-stock" },
  { icon: SyncAlt, key: "ward-stock" },
];

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div data-cy="pharmacy-home" className="pharmacy__home">
      <span className="pharmacy__home_title">{t("nav.pharmacy")}</span>
      <div className="pharmacy__actions">
        {actions.map((action) => (
          <LargeButton
            key={action.key}
            handleClick={() => {
              navigate(action.key);
            }}
            data-cy={action.key}
          >
            <div className="largeButton__inner">
              <action.icon />
              <div className="largeButton__inner__label">
                {t(`pharmacy.labels.${action.key}`)}
              </div>
            </div>
          </LargeButton>
        ))}
      </div>
    </div>
  );
}
