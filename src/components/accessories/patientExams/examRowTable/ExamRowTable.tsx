import React, { FC, useCallback } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";
import "./styles.scss";
import { IEditableTableProps } from "./types";
import { debounce } from "lodash";

const ExamRowTable: FC<IEditableTableProps> = ({
  rows,
  onBlur,
  headerData,
  title,
}) => {
  const handleOnBlur = (value: string) => {
    debounceUpdate(value);
  };

  const debounceUpdate = useCallback(
    debounce((value: string) => onBlur(value), 100),
    []
  );
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography style={{ marginLeft: "15" }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer>
          <Table
            stickyHeader
            className="table"
            size="small"
            aria-label="results table"
          >
            <TableHead>
              <TableRow key={"header"}>
                {headerData.map((row, index) => {
                  return (
                    <TableCell key={index} align={row.align}>
                      {row.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="td" scope="row">
                    {row.value}
                  </TableCell>
                  <TableCell align="right" component="td" scope="row">
                    <Checkbox
                      onChange={(e, value) => {
                        handleOnBlur(row.label);
                      }}
                      value={row.label}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};
export default ExamRowTable;
