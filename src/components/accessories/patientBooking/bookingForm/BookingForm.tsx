import { Badge, createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import React, { ChangeEvent, FC, useState } from "react";
import DateField from "../../dateField/DateField";
import SelectField from "../../selectField/SelectField";
import SmallButton from "../../smallButton/SmallButton";
import TextButton from "../../textButton/TextButton";
import "./styles.scss";
import { TProps } from "./types";
import { categories, services } from "./consts";

const BookingForm: FC<TProps> = (props) => {
  const dummyField = {
    name: "dummyName",
    isValid: false,
    errorText: "",
    field: Object({}),
    onChange: (e: ChangeEvent<any>) => console.log(e),
    onBlur: (e: ChangeEvent<any>) => console.log(e),
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [unAvailables, setUnavailables] = useState([12, 20, 14, 5, 6, 25]);
  const [barelyAvailable, setBarelyAvalaible] = useState([1, 30]);
  const handleDateMonthChange = (date: Date | null) => {
    const result1 = [];
    while (result1.length <= 5) {
      result1.push(Math.floor(Math.random() * 31));
    }
    setUnavailables(result1);

    const result2 = [];
    while (result2.length <= 4) {
      result2.push(Math.floor(Math.random() * 15));
    }
    setBarelyAvalaible(result2);
  };

  const handleDateChange = (date: Date | null) => {
    date ? setSelectedDate(date) : setSelectedDate(new Date());
  };

  const filtrerUnavailableDates = (date: Date | null) => {
    return unAvailables.includes(date!.getDate());
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
    const isUnAvalaible = unAvailables.includes(dateClone.getDate());
    const isBarelyAvalaible = barelyAvailable.includes(dateClone.getDate());
    const className = isUnAvalaible
      ? "u-available"
      : isBarelyAvalaible
      ? "b-available"
      : "available";
    if (dayInCurrentMonth) {
      return (
        <Badge
          id="badge"
          key={date.toString()}
          overlap="circle"
          badgeContent={<span className={className + " hidden-dot"}></span>}
        >
          {component}
        </Badge>
      );
    } else return <Badge> {component} </Badge>;
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
                options={categories}
              />
            </div>
            <div className="patientBookingForm__item">
              <SelectField
                {...dummyField}
                fieldName="Service"
                fieldValue={""}
                label="Service"
                options={services}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientBookingForm__item">
              <MuiThemeProvider theme={theme}>
                <DateField
                  fieldName="opdDate"
                  fieldValue={selectedDate.toString()}
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
