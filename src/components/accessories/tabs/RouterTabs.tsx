import classNames from "classnames";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { useHistory, useRouteMatch, useLocation} from "react-router-dom";
import { Switch } from "react-router";
import { IProps } from "./types";
import PrivateRoute from "../privateRoute/PrivateRoute";
import "./styles.scss";

const RouterTabs: FunctionComponent<IProps> = ({ config, defaultRoute }) => {
  const history = useHistory();
  const match = useRouteMatch();
  const { url } = match;
  const {pathname} = useLocation();
  const currentPath: string | undefined = config.map(item => item.path).find(path => pathname.match(new RegExp(`^(${url}${path})([/?].*)?$`, "gi")));

  const switchTab = (path: string) => {
    history.push(url + path);
  };

  useEffect(() => {
    if (defaultRoute && !currentPath) {
      // default tab route
      history.push(url + defaultRoute);
    };
  }, [history, defaultRoute, currentPath, url]);


  const renderHeader = (mobile = false): JSX.Element[] => {
    if(!mobile){
      return config.map((item, index) => {
        const path = item.path!;
        return (

          <div className={classNames("tab", { active: (path === currentPath) })} key={index} onClick={() => switchTab(path)}>
            <span>{item.label}</span>            
          </div>
        )
      }) 
    } else {
      return config.map((item, index) => {
        const path = item.path!;
        return (
          <option className={classNames("tab", { active: (path === currentPath) })} key={index} value={path}>
            {item.label}
          </option>
        )
      })
    }
  };

  return (
    <Fragment>
      <div className="tabs_header">
        <div className="tabs desktop">
          { renderHeader() }
        </div>
        <div className="tabs mobile">
          <select value={currentPath} onChange={(e) => switchTab(e.target.value)}>
            { renderHeader(true) }
          </select>
        </div>
      </div>
      <div className="tabs_content"> 
        <Switch>
          {config.map((item, index) => (
                            
             <PrivateRoute path={url + item.path} key={index}>
                <div className="panel">
                  {item.content}
                </div>
              </PrivateRoute>
           ))}
        </Switch>
      </div>
    </Fragment>
  );
};

export default RouterTabs;