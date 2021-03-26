import classNames from "classnames";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Switch } from "react-router";
import { IProps } from "./types";
import PrivateRoute from "../privateRoute/PrivateRoute";
import "./styles.scss";

const RouterTabs: FunctionComponent<IProps> = ({ config }) => {
  const [ currentIndex, updateCurrentIndex ] = useState(0); 
  const history = useHistory();
  const match = useRouteMatch();
  const { url } = match;

  const switchTab = (index: number, path: string) => {
    updateCurrentIndex(index);
    history.push(url + path)
  };

  const handleChangeMobileTab = (index: number): void => {
    switchTab(index, config[index].path!)
  };


  useEffect(() => {
    // default tab route - summary
    history.push(`${url}/summary`)
  }, [history, url]);


  const renderHeader = (mobile = false): JSX.Element[] => {
    if(!mobile){
      return config.map((item, index) => {
        const path = item.path!;
        return (
          <div className={classNames("tab", { active: (currentIndex === index) })} key={index} onClick={() => switchTab(index, path)}>
            <span>{item.label}</span>
          </div>
        )
      })
    } else {
      return config.map((item, index) => {
        return (
          <option className={classNames("tab", { active: (currentIndex === index) })} key={index} value={index}>
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
          <select value={currentIndex} onChange={(e) => handleChangeMobileTab(parseInt(e.target.value))}>
            { renderHeader(true) }
          </select>
        </div>
      </div>
      <div className="tabs_content"> 
        <Switch>
          {config.map(item => (
            <PrivateRoute path={url + item.path}>
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