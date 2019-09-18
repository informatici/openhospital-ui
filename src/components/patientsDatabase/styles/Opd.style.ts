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

    patientTitle: {
      fontSize: 16,
      fontWeight: "bold",
      letterSpacing: 1,
    },

    attendanceTitle: {
      fontSize: 16,
      fontWeight: "bold",
      letterSpacing: 1,
    },

    opdNumberTitle: {
      fontSize: 16,
      fontWeight: "bold",
      letterSpacing: 1,
    },
     
    opdHeader: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop:20
    },
    
    deseaseHeader: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      marginLeft:"auto",
      marginTop:35
    },

    patientProfileHeader: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },

    patientRadioOpd: {
      display: "flex",
     
      alignItems: "center",
    },

    colleagueProfile: {
      textAlign: "left",
    },
    avatar: {
      height: 200,
      width: 200,
      margin: "0 auto",
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
    sheetButton: {
      textTransform: "none",
      color: theme.palette.primary.red,
      fontWeight: "bold",
      borderRadius: 20,
      marginLeft: 308,
      // alignSelf: 'flex-end',
      // marginBottom: '8px',
      "&:hover": {
        color: theme.palette.primary.white,
        background: theme.palette.primary.red,
      },
      padding: "5px 25px",
    },

    therapyButton: {
      textTransform: "none",
      color: theme.palette.primary.red,
      fontWeight: "bold",

      borderRadius: 20,
      marginLeft: 44,
      // alignSelf: 'flex-end',
      // marginBottom: '8px',
      "&:hover": {
        color: theme.palette.primary.white,
        background: theme.palette.primary.red,
      },
    },

    summaryButton: {
      textTransform: "none",
      fontSize: 10,
      fontWeight: "bold",
      borderRadius: 0,
      marginLeft: 0,
      background: theme.palette.primary.white,
    },

    opdButton: {
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
      padding: "5px 26px",
    },

    visitButton: {
      textTransform: "none",
      color: theme.palette.primary.red,
      fontWeight: "bold",
      borderRadius: 20,
      marginLeft: 47,
      // alignSelf: 'flex-end',
      // marginBottom: '8px',
      "&:hover": {
        color: theme.palette.primary.white,
        background: theme.palette.primary.red,
      },
    },

    drugPrescribed: {
      fontSize: "15px",
      fontWeight: "bold",
      letterSpacing: 1,
    },
    detailButtonTherapy: {
      textTransform: "none",
      color: theme.palette.primary.red,
      fontWeight: "bold",
      borderRadius: 20,
      // marginBottom: '8px',
      marginLeft: "724px",
      "&:hover": {
        color: theme.palette.primary.white,
        background: theme.palette.primary.red,
      },
    },

    buttonIcon: {
      marginRight: 5,
    },

    patientName: {
      fontSize: "30px",
      fontWeight: "bold",
      letterSpacing: 1,
    },

    opdHystory: {
      fontSize: "20px",
      fontWeight: "bold",
      letterSpacing: 1,
    },

    formTitle: {
      fontSize: "15px",
      fontWeight: "bold",
      letterSpacing: 1,
    },

    patientSummary: {
      fontSize: "20px",
      fontWeight: "bold",
      letterSpacing: 1,
    },

    patientAddress: {
      fontSize: "15px",
      fontWeight: "bold",
      letterSpacing: 1,
    },

    calendarTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      textAlign: "center",
      letterSpacing: 1,
    },

    sidebar: {
      backgroundColor: theme.palette.primary.darkGrey,
      color: theme.palette.primary.white,
      padding: "40px 30px !important",
    },

    patientContent: {
      backgroundColor: "#ffffff",
      padding: "40px !important",
    },
    contacts: {
      fontSize: 16,
      letterSpacing: 1,
      marginTop: 40,
    },

    divider: {
      backgroundColor: "#808080",
      // opacity: 0.2,
      width: "100%",
    },

    table: {
      minWidth: 650,
    },

    boxInfo: {
      display: "flex",
      paddingBottom: 10,
      paddingLeft: 20,
    },

    boxItem: {
      display: "flex",
      flex: 1,
      textAlign: "center",
      borderRadius: 0,
      boxShadow: "none",
      border: "1px solid ",
    },

    numberOf: {
      fontSize: 60,
      fontWeight: "bold",
      letterSpacing: 1,
    },

    object: {
      fontSize: 14,
      fontWeight: "bold",
      letterSpacing: 0.26,
    },

    subTitle: {
      fontSize: 10,
      fontWeight: "bold",
      letterSpacing: 0.2,
    },

    dayTable: {
      padding: 40,
      fontWeight: "bold",
    },

    patientSummaryCard: {
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 0,
      paddingRight: 0,
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

    detailButtonBillContainer: {
      display: "flex",
      alignItems: "left",
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

    detailButtonICD: {
      textTransform: "none",
      color: theme.palette.primary.red,
      fontWeight: "bold",
      borderRadius: 20,
      // marginBottom: '8px',
      marginLeft: "-4px",
      marginTop: 53,
      "&:hover": {
        color: theme.palette.primary.white,
        background: theme.palette.primary.red,
      },
    },
    detailButtonLabelInverse: {
      color: theme.palette.primary.white,
      // justifyContent: 'flex-end'
    },
    detailButtonLabelPrint: {
      color: theme.palette.primary.white,
    },

    avatarTitle: {
      marginTop: 30,
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold",
    },

    formFieldInputNotes: {
      padding: "40px",
    },

    patientIdTitle: {
      marginTop: 30,
      textAlign: "left",
      fontSize: 20,
    },
    patientIdNumber: {
      marginTop: 5,
      textAlign: "left",
      fontSize: 40,
      fontWeight: "bold",
    },
    opdTitle: {
      marginTop: 30,
      textAlign: "left",
      fontSize: 20,
    },
    opdNumber: {
      marginTop: 5,
      textAlign: "left",
      fontSize: 40,
      fontWeight: "bold",
    },
    bloodGroup: {
      marginTop: 30,
      textAlign: "left",
      fontSize: 20,
    },
    bloodType: {
      marginTop: 5,
      textAlign: "left",
      fontSize: 40,
      fontWeight: "bold",
    },
    notes: {
      marginTop: 5,
      textAlign: "left",
      fontSize: 16,
      fontWeight: "bold",
    },
    notesDetails: {
      marginTop: 5,
      textAlign: "left",
      fontSize: 15,
    },

    opdNotes: {
      marginTop: 5,
      textAlign: "left",
      fontSize: 16,
      fontWeight: "bold",
      fontFamily: "Open Sans, sans-serif"
    },

    admissionDate: {
      marginTop: 5,
      textAlign: "left",
      fontSize: 15,
    },
    reasonVisit: {
      marginTop: 30,
      textAlign: "left",
      fontSize: 15,
    },
    reasonVisitType: {
      marginTop: 5,
      textAlign: "left",
      fontSize: 15,
      fontWeight: "bold",
    },
    treatment: {
      marginTop: 30,
      textAlign: "left",
      fontSize: 15,
    },
    treatmentType: {
      marginTop: 5,
      textAlign: "left",
      fontSize: 15,
      fontWeight: "bold",
    },

    formField: {
      width: "100%",
      margin: "8px 0 !important",
    },

    formDiagnosisField: {
      marginLeft:36
    },

    formDeseaseField:{
      marginLeft:10
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
      padding: "12px 330px !important",
    },

   
    select: {
      padding: "0px 0 !important",
      "& :focus": {
        borderRadius: "6px !important",
        border: `1px solid ${theme.palette.primary.inputBorder} !important`,
        backgroundColor: theme.palette.primary.white,
        padding: "12px 0 !important",
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

    admissionTitle: {
      fontWeight: "bold",
      fontSize: 20,
      letterSpacing: 1,
    },

    formatFormAdmission: {
      float: "left",
      width: "50%",
      padding: "30px",
      paddingLeft: 0,
    },

    formatFormAdmissionDate: {
      float: "left",
      width: "30%",
      padding: "30px",
      paddingLeft: 0,
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
