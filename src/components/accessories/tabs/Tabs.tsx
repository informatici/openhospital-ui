import classNames from "classnames";
import React, { Fragment, FunctionComponent, useState } from "react";
import { IProps } from "./types";
import "./styles.scss";

const Tabs: FunctionComponent<IProps> = ({ config }) => {

  const [ currentIndex, updateCurrentIndex ] = useState(0); 

  const renderHeader = (mobile = false): JSX.Element[] => {
    if(!mobile){
      return config.map((item, index) => {
        return (
          <div className={classNames("tab", { active: (currentIndex === index) })} key={index} onClick={() => updateCurrentIndex(index)}>
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

  const renderContent = (): JSX.Element | null => {
    const content = config[currentIndex]?.content
    if (content) {
       return (
         <div className="panel">
           {content}
         </div>
       );
    }
    return null;
  };

  return (
    <Fragment>
      <div className="tabs_header">
        <div className="tabs desktop">
          { renderHeader() }
        </div>
        <div className="tabs mobile">
          <select value={ currentIndex } onChange={(e) => updateCurrentIndex(parseInt(e.target.value)) }>
            { renderHeader(true) }
          </select>
        </div>
      </div>
      <div className="tabs_content">
        { renderContent() }
      </div>
    </Fragment>
  );
};

export default Tabs;