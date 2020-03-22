import React, { FunctionComponent } from "react";
import { Paper, Typography, Divider, withStyles } from "@material-ui/core";
import classNames from "classnames";
import { TSummaryBoard as Props } from "./types";
import styles from "./login.style";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";

const SummaryBoard: FunctionComponent<Props> = ({ classes }) => {
  const scrollSummaryIn = () => {
    const element = document.getElementById("summary-panel");
    if (element) {
      document.getElementById("summary-panel").scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div id={"summary-panel"} className={classes.summaryPanel}>
      <Paper className={classNames(classes.summaryPaperFlat, classes.paper)}>
        <div className={classes.scrollIn} onClick={scrollSummaryIn}>
          <ExpandLessRoundedIcon style={{ fill: "#FFFFFF" }} fontSize="large" onClick={scrollSummaryIn} />
        </div>
        &nbsp;
        <Typography variant="inherit" className={classes.inTitle}>
          INPATIENT DEPARTMENT
        </Typography>
        &nbsp;
        <Typography variant="inherit" className={classes.inSummary}>
          SUMMARY DATA
        </Typography>
        &nbsp;
        <div className={classes.summaryTable}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map(index => {
            const itemClass = (index + 1) % 4 !== 0 ? classes.tableItem : classes.breakTableItem;

            return (
              <div className={itemClass}>
                <Typography className={classes.numberOf}>46%</Typography>
                <Typography className={classes.subTitle}>BOR</Typography>
                <Typography className={classes.subTitleSpec}>Bed Occupancy Rate</Typography>
              </div>
            );
          })}
        </div>
        &nbsp;
        <Divider className={classes.summaryDivider} />
        &emsp;
        <Typography variant="inherit" className={classes.inTitle}>
          OUTPATIENT DEPARTMENT
        </Typography>
        &nbsp;
        <Typography variant="inherit" className={classes.inSummary}>
          SUMMARY DATA
        </Typography>
        &nbsp;
        <div className={classes.summaryTable}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map(index => {
            const itemClass = (index + 1) % 4 !== 0 ? classes.tableItem : classes.breakTableItem;

            return (
              <div className={itemClass}>
                <Typography className={classes.numberOf}>46%</Typography>
                <Typography className={classes.subTitle}>BOR</Typography>
                <Typography className={classes.subTitleSpec}>Bed Occupancy Rate</Typography>
              </div>
            );
          })}
        </div>
      </Paper>
    </div>
  );
};

const styledComponent = withStyles(styles, { withTheme: true })(SummaryBoard);
export default styledComponent;
