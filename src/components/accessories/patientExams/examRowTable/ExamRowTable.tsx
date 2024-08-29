import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAppSelector } from "libraries/hooks/redux";
import { debounce, isEmpty } from "lodash";
import React, { FC, useCallback } from "react";
import { IState } from "../../../../types";
import "./styles.scss";
import { IEditableTableProps } from "./types";

const ExamRowTable: FC<IEditableTableProps> = ({
  rows,
  onBlur,
  headerData,
  title,
  disabled = false,
}) => {
  const labToEditRows = useAppSelector(
    (state: IState) =>
      state.laboratories.getLabWithRowsByCode.data?.laboratoryRowList
  );

  const handleOnBlur = (value: string) => {
    debounceUpdate(value);
  };

  const debounceUpdate = useCallback(
    debounce((value: string) => onBlur(value), 100),
    []
  );
  return (
    <Accordion disabled={disabled}>
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
                      defaultChecked={
                        !isEmpty(
                          labToEditRows?.filter((e) => e === row.label) ?? []
                        )
                      }
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
