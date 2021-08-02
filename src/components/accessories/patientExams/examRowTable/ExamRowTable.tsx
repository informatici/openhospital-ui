import React, { FC, useEffect, useState } from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TextField, Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./styles.scss";
import { IExamRowTableProps } from "./types";

const ExamRowTable: FC<IExamRowTableProps> = ({
  rows,
  onBlur,
  fieldValues = [],
}) => {
  const [values, setValues] = useState([""]);

  const handleOnBlur = (e: any, label: string) => {
    onBlur(e, label, e.target.value);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography style={{ marginLeft: "15" }}>Results</Typography>
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
              <TableRow>
                <TableCell align="left">Exam Row</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.value}
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    <TextField
                      style={{ border: "none" }}
                      onBlur={(e: any) => handleOnBlur(e, row.value)}
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
