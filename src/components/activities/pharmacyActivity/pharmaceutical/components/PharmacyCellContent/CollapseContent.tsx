import React, { FC } from "react";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import Button from "components/accessories/button/Button";

interface ICollapseContentProps {
  row: any;
  labelData: Record<string, string>;
  tableHeader: string[];
  dateFields: string[];
  detailsExcludedFields?: string[];
  showEmptyCell?: boolean;
  adjustQuantity?: boolean;
}

const CollapseContent: FC<ICollapseContentProps> = ({
  row,
  labelData,
  tableHeader,
  dateFields,
  detailsExcludedFields,
  showEmptyCell = true,
  adjustQuantity = false,
}) => {
  const { t } = useTranslation();

  const safeLabelData = labelData || {};
  const safeRow = row || {};
  const safeTableHeader = tableHeader || [];
  const safeDateFields = dateFields || [];
  const safeExcludedFields = detailsExcludedFields ?? [];
  
  const keysToDisplay = Object.keys(
    _.omit(
      safeLabelData,
      safeTableHeader
        .filter((item) => !safeDateFields.includes(item))
        .concat(safeExcludedFields)
    )
  ).filter((key) => Object.keys(safeRow).includes(key));
  
  return (
    <div className="collapseItem">
      <ul>
        {keysToDisplay.map((key, index) =>
          showEmptyCell || !!row[key] ? (
            <li className="collapseItem_row" key={index}>
              <strong>{labelData[key]}:&nbsp;</strong>
              <span>{row[key]}</span>
            </li>
          ) : null
        )}
      </ul>

      {adjustQuantity && row.type === "Charge" && (
        <Button type="button" variant="outlined" color="inherit">
          {t("pharmacy.stock.adjustQuantity")}
        </Button>
      )}
    </div>
  );
};

export default CollapseContent;
