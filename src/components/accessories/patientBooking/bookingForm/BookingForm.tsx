import {
  Badge,
  createMuiTheme,
  createStyles,
  IconButton,
  makeStyles,
  MuiThemeProvider,
} from "@material-ui/core";
import { Beenhere } from "@material-ui/icons";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import {
  endOfWeek,
  format,
  isSameDay,
  isWithinInterval,
  startOfWeek,
} from "date-fns";
import React, { ChangeEvent, FC, useState } from "react";
import DateField from "../../dateField/DateField";
import SelectField from "../../selectField/SelectField";
import SmallButton from "../../smallButton/SmallButton";
import TextButton from "../../textButton/TextButton";
import "./styles.scss";

const BookingForm: FC = (props) => {
  const dummyField = {
    name: "dummyName",
    isValid: false,
    errorText: "",
    field: Object({}),
    onChange: (e: ChangeEvent<any>) => console.log(e),
    onBlur: (e: ChangeEvent<any>) => console.log(e),
  };
  const optionsCategory = [
    { label: "exams", value: "exams" },
    { label: "medecine", value: "medecine" },
  ];
  const optionsService = [
    { label: "para", value: "paracetamol" },
    { label: "eff", value: "efferalgan" },
  ];
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date | null) => {
    console.log("hello..", date);
    date ? setSelectedDate(date) : setSelectedDate(new Date());
  };
  const renderWrappedDay = (
    date: any,
    selectedDate: any,
    dayInCurrentMonth: boolean,
    component: any
  ) => {
    let dateClone = new Date(date);
    let selectedDateClone = new Date(selectedDate);

    const start = startOfWeek(selectedDateClone);
    const end = endOfWeek(selectedDateClone);

    //const dayIsBetween = isWithinInterval(dateClone, { start, end });
    const isFirstDay = isSameDay(dateClone, start);
    const isLastDay = isSameDay(dateClone, end);

    let wrapperClassName = "";
    return (
      <div>
        <IconButton>
          <Badge
            badgeContent={format(dateClone, "d")}
            color={isLastDay || isFirstDay ? "secondary" : "primary"}
          ></Badge>
        </IconButton>
      </div>
    );
  };

  return (
    <>
      <div className="patientBookingForm">
        <form className="patientBookingForm__form">
          <div className="row start-sm center-xs">
            <div className="patientBookingForm__item">
              <SelectField
                {...dummyField}
                fieldName="Category"
                fieldValue={""}
                label="Category"
                options={optionsCategory}
              />
            </div>
            <div className="patientBookingForm__item">
              <SelectField
                {...dummyField}
                fieldName="Service"
                fieldValue={""}
                label="Service"
                options={optionsService}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientBookingForm__item">
              <DateField
                fieldName="opdDate"
                fieldValue={""}
                disableFuture={false}
                theme="light"
                onChange={handleDateChange}
                renderDay={renderWrappedDay}
                format="dd/MM/yyyy"
                isValid={false}
                errorText={""}
                label="Date"
              />
            </div>
          </div>
          <div className="patientBookingForm__buttonSet">
            <div className="submit_button">
              <SmallButton type="submit" disabled={true}>
                SAVE
              </SmallButton>
            </div>
            <div className="reset_button">
              <TextButton onClick={() => console.log("submitting ...")}>
                DISCARD
              </TextButton>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BookingForm;

export const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(250, 0, 2)",
      light: "rgb(250, 202, 2)",
      dark: "rgb(250, 0, 220)",
    },
    secondary: {
      main: "rgb(250, 215, 2)",
    },
  },
});
