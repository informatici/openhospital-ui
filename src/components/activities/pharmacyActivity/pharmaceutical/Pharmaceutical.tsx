import React from 'react'
import { useTranslation } from 'react-i18next'
import PharmaceuticalActions from './pharmaceuticalActions/PharmaceuticalActions';

export default function Pharmaceutical() {
    const { t } = useTranslation();
  return (
    <div className="pharmaceutical">
        <h3 className="pharmaceutical__title">
            {t("pharmacy.labels.pharmaceutical-title")}
        </h3>
        <div className="pharmaceutical__content">
            <PharmaceuticalActions />
        </div>
    </div>
  )
}
