import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      // marginTop: 50
    },
    paperHeader: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      // color: theme.palette.text.secondary,
      borderRadius: 0,
      background: theme.palette.primary.main,
      boxShadow: "0 4px 8px 0 rgba(48,49,51,0.1)",
      width: "100%",
      zIndex: 1,
      // display: 'flex',
      // justifyContent: 'space-start'
    },
    colleagueProfileHeader: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    colleagueProfile: {
      textAlign: "left",
    },
    avatar: {
      height: 104,
      width: 104,
      // margin: '0 auto',
      border: "4px solid #e6e6e6",
      "&.avatarSmall": {
        height: 44,
        width: 44,
        margin: 0,
      },
    },
    // detailButtonContainer: {
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    chatButton: {
      textTransform: "none",
      color: theme.palette.primary.red,
      fontWeight: "bold",
      borderRadius: 20,
      marginLeft: "auto",
      // alignSelf: 'flex-end',
      // marginBottom: '8px',
      "&:hover": {
        color: theme.palette.primary.white,
        background: theme.palette.primary.red,
      },
    },
    chatButtonLabel: {
      justifyContent: "flex-end",
    },
    buttonIcon: {
      marginRight: 5,
    },
    colleagueName: {
      fontSize: "24px",
      fontWeight: "bold",
      letterSpacing: 1,
    },
    sidebar: {
      backgroundColor: theme.palette.primary.darkGrey,
      color: theme.palette.primary.white,
      padding: "40px 30px !important",
    },
    colleagueContent: {
      backgroundColor: "#F9F9F9",
      padding: "40px !important",
    },
    contacts: {
      fontSize: 16,
      letterSpacing: 1,
      marginTop: 40,
    },
    divider: {
      backgroundColor: "#F9F9F9",
      opacity: 0.2,
    },
    iconAndText: {
      display: "flex",
      alignItems: "center",
      // fontWeight: 'bold',
      padding: "5px 0",
    },
    contactsContainer: {
      padding: "15px 15px",
    },
    sidebarPatients: {
      paddingTop: 25,
    },
    sidebarPatientsItem: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingBottom: 20,
    },
    rosterActions: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom: 60,
    },
    rosterTitle: {
      marginRight: "auto",
      fontSize: 16,
      letterSpacing: 1,
    },
    rosterInfo: {
      display: "flex",
      paddingBottom: 10,
    },
    rosterInfoItem: {
      display: "flex",
      flex: 1,
      textAlign: "center",
      borderRadius: 0,
      boxShadow: "none",
      border: "1px solid #F9F9F9",
      "& .value": {
        fontSize: 48,
        fontWeight: "bold",
        letterSpacing: 1,
      },
      "& .title": {
        fontSize: 12,
        letterSpacing: 1,
        textTransform: "uppercase",
      },
      "& .subTitle": {
        fontSize: 12,
        letterSpacing: 0.2,
      },
      "& .subValue": {
        fontSize: 14,
        letterSpacing: 0.26,
      },
    },
    appointmentsTitle: {
      marginRight: "auto",
    },
    expandButton: {
      color: theme.palette.primary.red,
    },
    appointmentsTitleContainer: {
      borderBottom: `1px solid ${theme.palette.primary.lightGrey}`,
      margin: "0 16px 16px 16px",
      width: "auto",
      paddingBottom: 5,
    },
    appointmentsDWM: {
      borderRadius: 20,
      color: theme.palette.primary.grey,
    },
    appointments: {
      // padding: 0,
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
    appointmentsListItemCheckbox: {
      // paddingRight: 0
    },
    cardMaterials: {
      padding: 0,
    },
    materialsList: {
      padding: 0,
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
    materialsListItemTitle: {
      fontSize: 18,
      letterSpacing: 1,
      fontWeight: "bold",
      padding: 5,
    },
    materialsListItemTitleWarning: {
      padding: 5,
      fontSize: 12,
      letterSpacing: 0.3,
      color: theme.palette.primary.red,
    },
    materialsListItemBigNumber: {
      fontSize: 48,
      letterSpacing: 1,
      fontWeight: "bold",
      padding: 5,
    },
    materialsListItemBigNumberDesc: {
      fontSize: 14,
      letterSpacing: 0.26,
      color: theme.palette.primary.grey,
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
    detailButtonContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    detailButton: {
      textTransform: "none",
      color: theme.palette.primary.red,
      fontWeight: "bold",
      borderRadius: 20,
      // marginBottom: '8px',
      marginLeft: "17px",
      "&:hover": {
        color: theme.palette.primary.white,
        background: theme.palette.primary.red,
      },
    },
    detailButtonLabel: {
      // justifyContent: 'flex-end'
    },
    formField: {
      width: "100%",
    },
    formFieldInput: {
      padding: "6px 0",
      "& input": {
        padding: 6,
      },
    },
    formFieldInputLabel: {
      transform: "translate(14px, 14px) scale(1)",
    },
    formFieldSelect: {
      // marginTop: '16px',
      // marginBottom: '8px',
    },
    formFieldSelectInput: {
      padding: "6px 0 !important",
    },
    select: {
      padding: "6px 0 !important",
      "& :focus": {
        borderRadius: "6px !important",
        border: `1px solid ${theme.palette.primary.inputBorder} !important`,
        backgroundColor: theme.palette.primary.white,
        padding: "6px 0 !important",
      },
    },
    selectLabel: {
      // '&$focused': {
      // color: 'purple !important',
      transform: "translate(0px, -20px) scale(1) !important",
      // },
    },

    paper: {
      // padding: theme.spacing.unit * 2,
      padding: 0,
      textAlign: "center",
      // color: theme.palette.text.secondary,
      borderRadius: 10,
      background: theme.palette.primary.main,
      boxShadow: "0 4px 8px 0 rgba(48,49,51,0.1)",
    },
    paperPerson: {
      display: "flex",
      justifyContent: "center",
    },
    gridContainer: {
      margin: "0 auto",
      paddingTop: 60,
    },

    breadCrumb: {
      fontWeight: "bold",
      fontSize: 12,
      letterSpacing: 0.75,
    },

    colleaguesTitle: {
      fontWeight: "bold",
      fontSize: 16,
      letterSpacing: 1,
    },
    findColleagues: {
      fontWeight: "bold",
      fontSize: 14,
      letterSpacing: 0.88,
      textAlign: "left",
      paddingRight: 20,
    },
    insertInfoColleagues: {
      fontSize: 14,
      letterSpacing: 0.78,
      textAlign: "left",
    },
    cssOutlinedInput: {
      borderColor: `${theme.palette.primary.inputBorder} !important`,
      "& legend": {
        width: "0 !important",
      },
    },
    cssFocused: {
      "&$cssFocused": {
        // color: 'purple',
        transform: "translate(0px, -20px) scale(1)",
      },
    },
    inputContainer: {
      display: "flex",
    },
    colleagueContainer: {
      paddingTop: 20,
      paddingBottom: 20,
    },
    cardAction: {
      borderBottom: `1px solid ${theme.palette.primary.lightGrey}`,
      "&:hover $avatar": {
        border: `4px solid ${theme.palette.primary.red}`,
      },
    },
  });

export default styles;
