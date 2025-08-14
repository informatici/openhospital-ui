import Button from "components/accessories/button/Button";
import { TFilterField } from "components/accessories/table/filter/types";
import Table from "components/accessories/table/Table";
import { SettingDTO, SettingDTOTypeEnum } from "generated";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import "../Settings.module.scss";

type IOwnProps = {
  items: SettingDTO[];
  onEdit: (setting: SettingDTO) => void;
  onResetAll: () => void;
  category: string;
  categories: string[];
};

const SettingsTable: FC<IOwnProps> = ({
  items,
  onEdit,
  categories,
  category,
  onResetAll,
}) => {
  const { t } = useTranslation();

  const headers: string[] = [
    "code",
    ...(category === "all" ? ["category"] : []),
    "value",
    "needRestart",
  ];

  const FormatValue: FC<{ value: string; type: SettingDTOTypeEnum }> = ({
    value,
    type,
  }) => {
    switch (type) {
      case SettingDTOTypeEnum.Bool:
        return value.toLocaleLowerCase() === "true"
          ? t("common.yes")
          : t("common.no");
      default:
        return value;
    }
  };

  const labels = {
    code: t("settings.code"),
    ...(category === "all" ? { category: t("settings.category") } : {}),
    description: t("settings.description"),
    needRestart: t("settings.needRestart"),
    valueOptions: t("settings.valueOptions"),
    value: t("settings.value"),
    defaultValue: t("settings.defaultValue"),
  };

  const filters: TFilterField[] = [
    { key: "code", label: t("settings.code"), type: "text" },
  ];

  const order: string[] = ["code", ...(category === "all" ? ["category"] : [])];

  const formatDataToDisplay = (data: SettingDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code,
        category: t(`settings.categories.${item.category}`),
        description: item.description ?? "",
        type: item.type,
        needRestart: item.needRestart ? t("common.yes") : t("common.no"),
        valueOptions: item.valueOptions,
        value: <FormatValue value={item.value ?? ""} type={item.type} />,
        defaultValue: (
          <FormatValue value={item.defaultValue ?? ""} type={item.type} />
        ),
      };
    });
  };
  return (
    <div className="tableContainer">
      <Table
        rowData={formatDataToDisplay(items ?? [])}
        tableHeader={headers}
        labelData={labels}
        columnsOrder={order}
        rowsPerPage={15}
        isCollapsabile={true}
        filterColumns={filters}
        showEmptyCell={false}
        rowKey="code"
        manualFilter={false}
        onEdit={onEdit}
        headerActions={
          <Button
            onClick={onResetAll}
            type="button"
            variant="contained"
            color="primary"
            dataCy="reset-all-settings"
          >
            {t("settings.resetAll")}
          </Button>
        }
      />
    </div>
  );
};

export default SettingsTable;
