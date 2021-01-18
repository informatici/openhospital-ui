import React, { FunctionComponent } from 'react';
import _ from "lodash";
import { makeStyles } from '@material-ui/core/styles';
import { Table as MaterialComponent } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "./styles.scss";
import { IProps } from "./types";

const Table: FunctionComponent<IProps> = ({
  values
}) => {

  const header = _.uniq(_.flattenDeep(_.map(values, _.keys)));

  return (
    <TableContainer component={Paper}>
      <MaterialComponent className="table" aria-label="simple table">
        <TableHead className="table_header">
          <TableRow>
            {header.map((h: string, i) => (
              <TableCell key={i}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="table_body">
          {values.map((row: Record<string, any>) => (
            <TableRow key={row.name}>
              {Object.values(row).map((value, index) => (
                <TableCell align="left" key={index}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MaterialComponent>
    </TableContainer>
  );
}

export default Table;