import {
  Badge,
  createMuiTheme,
  IconButton,
  MuiThemeProvider,
} from "@material-ui/core";
import { cyan, pink } from "@material-ui/core/colors";
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
import { TProps } from "./types";

const BookingForm: FC<TProps> = (props) => {
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
    { label: "paracetamol", value: "paracetamol" },
    { label: "efferalgan", value: "efferalgan" },
  ];
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availabilities, setAvailabilities] = useState([12, 20, 14, 5, 6, 25]);

  const handleDateMonthChange = (date: Date | null) => {
    const result = [];
    let i = 0;
    while (i < 12) {
      result.push(Math.floor(Math.random() * 31));
      i++;
    }
    setAvailabilities(result);
  };

  const handleDateChange = (date: Date | null) => {
    date ? setSelectedDate(date) : setSelectedDate(new Date());
  };

  const filtrerUnavailableDates = (date: Date | null) => {
    return !availabilities.includes(date ? date.getDate() : -5);
  };
  const renderWrappedDay = (
    date: any,
    selectedDate: any,
    dayInCurrentMonth: boolean,
    component: any
  ) => {
    let dateClone = new Date(date);
    let selectedDateClone = new Date(selectedDate);
    const isSelected =
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() == selectedDate.getMonth();
    const isAvalaible = availabilities.includes(dateClone.getDate());
    if (dayInCurrentMonth) {
      return (
        <div>
          <IconButton className="day">
            <Badge
              classes={
                isAvalaible
                  ? isSelected
                    ? { badge: "selectedDay" }
                    : { badge: "primary" }
                  : { badge: "secondary" }
              }
              badgeContent={format(dateClone, "d")}
            ></Badge>
          </IconButton>
        </div>
      );
    } else
      return (
        <IconButton className="day" style={{ display: "none" }}>
          <Badge badgeContent={format(dateClone, "d")}></Badge>
        </IconButton>
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
              <MuiThemeProvider theme={theme}>
                <DateField
                  fieldName="opdDate"
                  fieldValue={""}
                  disableFuture={false}
                  theme="regular"
                  onMonthChange={handleDateMonthChange}
                  onChange={handleDateChange}
                  renderDay={renderWrappedDay}
                  shouldDisableDate={filtrerUnavailableDates}
                  format="dd/MM/yyyy"
                  isValid={false}
                  errorText={""}
                  label="Date"
                />
              </MuiThemeProvider>
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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#444444",
    },
    secondary: {
      light: "#444444",
      main: "#444444",
      contrastText: "#444444",
    },
  },
});
