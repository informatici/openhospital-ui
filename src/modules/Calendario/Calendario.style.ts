import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      // marginTop: 50
    },

    gridContainer: {
      margin: "0 auto",
      paddingTop: 30,
    },

    breadCrumb: {
      fontWeight: "bold",
      fontSize: 12,
      letterSpacing: 0.75,
    },

    divider: {
      backgroundColor: "#8D8D8D",
      width: "100%",
    },

    dividerDay: {
      backgroundColor: "#f0f8ff",
    },

    calendarTitle: {
      fontWeight: "bold",
      fontSize: 25,
      letterSpacing: 1,
    },

    paper: {
      padding: 0,
      textAlign: "center",
      borderRadius: 10,
      background: theme.palette.primary.main,
      boxShadow: "0 4px 8px 0 rgba(48,49,51,0.1)",
    },

    paperCalendar: {
      textAlign: "center",
    },

    paperFlat: {
      // display: 'flex',
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      // color: theme.palette.text.secondary,
      borderRadius: "none",
      background: theme.palette.primary.main,
      boxShadow: "none",
      width: "100%",
    },

    paperFlatEvent: {
      // display: 'flex',
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      // color: theme.palette.text.secondary,
      borderRadius: "none",
      background: theme.palette.primary.main,
      boxShadow: "none",
      width: "107%",
      height: "100%",
    },

    materialsListItem: {
      borderBottom: `1px solid ${theme.palette.primary.lightGrey}`,
      "&:hover": {
        backgroundColor: "#F9F9F9",
      },
      padding: "50px 30px",
    },
    materialsListItemTitleContainer: {
      display: "flex",
      alignItems: "center",
      paddingBottom: "10px !important",
    },

    appointments: {
      // padding: 0,
    },

    appointmentsTitleContainer: {
      borderBottom: `1px solid ${theme.palette.primary.lightGrey}`,
      margin: "0 16px 16px 16px",
      width: "auto",
      paddingBottom: 5,
    },

    appointmentsTitle: {
      marginRight: "auto",
    },

    appointmentsListItem: {
      "&:hover": {
        backgroundColor: "#F9F9F9",
      },
    },
    appointmentsListItemText: {
      fontSize: 14,
      letterSpacing: 0.26,
    },
    appointmentsListItemGrid: {
      // padding: 0,
    },

    numberOf: {
      fontSize: 130,
      fontWeight: "bold",
      letterSpacing: 1,
      color: "#f0f8ff",
    },

    object: {
      fontSize: 15,
      fontWeight: "bold",
      letterSpacing: 0.26,
      color: "#f0f8ff",
    },

    year: {
      fontSize: 30,
      fontWeight: "bold",
      letterSpacing: 0.26,
      color: "#f0f8ff",
    },

    month: {
      fontSize: 35,
      fontWeight: "bold",
      letterSpacing: 0.26,
      color: "#f0f8ff",
    },

    day: {
      fontSize: 20,
      fontWeight: "bold",
      letterSpacing: 0.2,
      color: "#f0f8ff",
    },

    notes: {
      fontsize: "20",
      fontWeight: "bold",
      letterspacing: 0.26,
      color: "#f0f8ff",
    },

    subtitleNotes: {
      fontSize: 10,
      fontWeight: "bold",
      letterSpacing: 0.26,
      color: "#f0f8ff",
    },

    calendarEvents: {
      padding: 20,
    },

    button: {
      textTransform: "none",
      color: theme.palette.primary.red,
      fontWeight: "bold",
      borderRadius: 20,
      "&:hover": {
        color: theme.palette.primary.white,
        background: theme.palette.primary.red,
      },
      "&.mergeButton,&.addButton": {
        marginLeft: 40,
      },
      padding: "10px 58px",
    },

    buttonLabel: {
      width: 10,
    },

    calendarLink: {
      fontWeight: "bold",
      fontSize: 15,
      letterSpacing: 1,
    },

    table: {
      minWidth: 650,
    },

    tableTitle: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
    },

    dayTable: {
      padding: 40,
      fontWeight: "bold",
    },

    dayNumberTable: {
      padding: 40,
      fontWeight: "bold",
    },
  });

export default styles;
