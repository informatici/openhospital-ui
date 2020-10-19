import classNames from "classnames";
import React, { Fragment, FunctionComponent, useState } from "react";
import { IProps } from "./types";
import "./styles.scss";

const Tabs: FunctionComponent<IProps> = ({
  header,
  content,
}) => {

  const [ currentIndex, updateCurrentIndex ] = useState(0); 

  const renderHeader = (item: object | any, index: number, mobile: boolean = false): JSX.Element => {
    if(!mobile){
      return (
        <div className={classNames("tab", { active: (currentIndex === index) })} key={index} onClick={() => updateCurrentIndex(index)}>
          <span>{item[index]}</span>
        </div>
      );
    } else {
      return (
        <option className={classNames("tab", { active: (currentIndex === index) })} key={index} value={index}>
          {item[index]}
        </option>
      );
    }
  };

  const renderContent = (item: object | any, index: number): JSX.Element => {
    return (
      <div className="panel" key={index}>
        <span>{item[index]}</span>
      </div>
    );
  };

  return (
    <Fragment>
      <div className={ header.mainClass }>
        <div className="tabs desktop">
          { header.items?.map((item, index): JSX.Element => renderHeader(item, index)) }
        </div>
        <div className="tabs mobile">
          <select value={ currentIndex } onChange={(e) => updateCurrentIndex(parseInt(e.target.value)) }>
            { header.items?.map((item, index): JSX.Element => renderHeader(item, index, true)) }
          </select>
        </div>
      </div>
      <div className={ content.mainClass }>
        { content.items?.map((item, index): JSX.Element | null => (currentIndex === index) ? renderContent(item, index) : null) }
      </div>
    </Fragment>
  );
};

export default Tabs;