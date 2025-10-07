import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PharmaceuticalActions from './components/pharmaceuticalActions/PharmaceuticalActions';
import { PATHS } from 'consts';
import { useOutletContext } from 'react-router';
import PharmaceuticalTable from './components/pharmaceuticalTable/PharmaceuticalTable';

export default function Pharmaceutical() {
    const { t } = useTranslation();
    const { breadcrumbMap, setBreadcrumbMap } = useOutletContext<{
      breadcrumbMap: Record<string, string>;
      setBreadcrumbMap: (map: Record<string, string>) => void;
    }>();
  
    const addBreadcrumb = () => {
      setBreadcrumbMap({
        ...breadcrumbMap,
        [t("pharmacy.labels.pharmaceutical-title")]:
          PATHS.pharmacy_pharmaceutical,
      });
    };
  
    const removeBreadcrumb = () => {
      const updatedMap = { ...breadcrumbMap };
      delete updatedMap[t("pharmacy.labels.pharmaceutical-title")];
      setBreadcrumbMap(updatedMap);
    };
  
    useEffect(() => {
      addBreadcrumb();
      return () => {
        removeBreadcrumb();
      };
    }, []);
  return (
    <div className="pharmaceutical">
        <h3 className="pharmaceutical__title">
            {t("pharmacy.labels.pharmaceutical-title")}
        </h3>
        <div className="pharmaceutical__content">
            <PharmaceuticalActions />
        </div>
        <div className="pharmaceutical__content">
            <PharmaceuticalTable />
        </div>
    </div>
  )
}
