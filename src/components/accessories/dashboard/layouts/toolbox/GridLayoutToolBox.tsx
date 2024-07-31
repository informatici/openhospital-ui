import { FC } from "react";
import React from "react";
import { useDispatch, useSelector } from "libraries/hooks/redux";
import { IState } from "../../../../../types";
import { useTranslation } from "react-i18next";
import {
  TGridLayoutToolboxItemProps,
  TDashboardComponent,
  LayoutBreakpoints,
} from "../types";
import {
  addWidget,
  encodeLayout,
  getDashboardLabel,
  isEmptyLayout,
  removeDuplicates,
  removeWidget,
} from "../consts";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Layout, Layouts } from "react-grid-layout";
import { saveLayouts } from "../../../../../state/layouts";
import "./styles.scss";
import { UserSettingDTO } from "../../../../../generated";
import { TUserCredentials } from "../../../../../state/main/types";
import InfoBox from "../../../infoBox/InfoBox";

const GridLayoutToolbox: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userCredentials = useSelector<IState, TUserCredentials>(
    (state) => state.main.authentication.data
  );

  const breakpoint = useSelector<IState, string>(
    (state) => state.layouts.breakpoint
  );

  const layouts = useSelector<IState, Layouts>(
    (state: IState) => state.layouts.layouts
  );

  const dashboardSetting = useSelector<IState, UserSettingDTO | undefined>(
    (state) => state.layouts.getLayouts.data
  );

  const toolbox = useSelector<IState, Layouts>(
    (state: IState) => state.layouts.toolbox
  );

  const onItemPut = (item: Layout) => {
    let layoutsTmp = removeDuplicates({
      ...layouts,
      ...addWidget(layouts, item, breakpoint as LayoutBreakpoints),
    });

    let toolboxTmp = removeDuplicates({
      ...toolbox,
      ...removeWidget(toolbox, item),
    });

    let setting: UserSettingDTO;

    if (!dashboardSetting) {
      setting = {
        configName: "dashboard",
        user: userCredentials?.username!,
      } as UserSettingDTO;
    } else {
      setting = { ...dashboardSetting };
    }

    setting.configValue = encodeLayout({
      layout: layoutsTmp,
      toolbox: toolboxTmp,
    });

    dispatch(saveLayouts(setting));
  };

  const GridLayoutToolboxItem: FC<TGridLayoutToolboxItemProps> = ({
    item,
    onTake,
  }) => {
    return (
      <div className="Toolbox-item">
        <Button
          className="Toolbox-item-button"
          variant="contained"
          color="inherit"
          endIcon={<Add />}
          onClick={() => onTake()}
        >
          <h4>{t(getDashboardLabel(item.i as TDashboardComponent))}</h4>
        </Button>
      </div>
    );
  };

  return (
    <div className="Dashboard-toolbox side">
      <div className="side__header">
        <div>
          <span>{t("dashboard.availabledashboard")}</span>
        </div>
      </div>
      <div className="side__body">
        <div className="section">
          {isEmptyLayout(toolbox) && (
            <div className="info-box-container" style={{ textAlign: "center" }}>
              <InfoBox type="info" message={t("dashboard.nowidgets")} />
            </div>
          )}

          {!isEmptyLayout(toolbox) && (
            <>
              {toolbox[breakpoint]
                ? toolbox[breakpoint].map((layout) => {
                    return (
                      <GridLayoutToolboxItem
                        key={layout.i}
                        item={layout}
                        onTake={() => onItemPut(layout)}
                      />
                    );
                  })
                : ""}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GridLayoutToolbox;
