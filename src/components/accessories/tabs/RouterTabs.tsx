import classNames from "classnames";
import React, { Fragment, FunctionComponent, useEffect } from "react";
import { Routes, useLocation, useNavigate } from "react-router";
import PrivateRoute from "../privateRoute/PrivateRoute";
import { useFilterPermission } from "./hooks/useFilterPermission";
import "./styles.scss";
import { IProps } from "./types";

const RouterTabs: FunctionComponent<IProps> = ({ config, defaultRoute }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tabs = useFilterPermission(config);
  const currentPath: string | undefined = config
    .map((item) => item.path)
    .find((path) =>
      pathname.match(new RegExp(`^(${pathname})([/?].*)?$`, "gi"))
    );

  const switchTab = (path: string) => {
    navigate(pathname);
  };

  useEffect(() => {
    if (defaultRoute) {
      navigate(pathname + defaultRoute);
    }
  }, [navigate, defaultRoute, pathname]);

  const renderHeader = (mobile = false): JSX.Element[] => {
    if (!mobile) {
      return tabs.map((item, index) => {
        const path = item.path!;
        return tabs.length == 1 ? (
          <></>
        ) : (
          <div
            className={classNames("tab", { active: path === currentPath })}
            key={index}
            onClick={() => switchTab(path)}
          >
            <span>{item.label}</span>
          </div>
        );
      });
    } else {
      return tabs.map((item, index) => {
        const path = item.path!;
        return (
          <option
            className={classNames("tab", { active: path === currentPath })}
            key={index}
            value={path}
          >
            {item.label}
          </option>
        );
      });
    }
  };

  return (
    <Fragment>
      <div className="tabs_header">
        <div className="tabs desktop">{renderHeader()}</div>
        <div className="tabs mobile">
          <select
            value={currentPath}
            onChange={(e) => switchTab(e.target.value)}
          >
            {renderHeader(true)}
          </select>
        </div>
      </div>
      <div className="tabs_content">
        <Routes>
          {tabs.map((item, index) => (
            <PrivateRoute path={pathname + item.path} key={index}>
              <div className="panel">{item.content}</div>
            </PrivateRoute>
          ))}
        </Routes>
      </div>
    </Fragment>
  );
};

export default RouterTabs;
