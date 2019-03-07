import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      // marginTop: 50
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      // color: theme.palette.text.secondary,
      borderRadius: 10,
      background: theme.palette.primary.main,
      boxShadow: '0 4px 8px 0 rgba(48,49,51,0.1)',
    },
    paperFlat: {
      // display: 'flex',
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      // color: theme.palette.text.secondary,
      borderRadius: 'none',
      background: theme.palette.primary.main,
      boxShadow: 'none',
      width: '100%',
    },
    gridContainer: {
      margin: '0 auto',
      paddingTop: 60,
    },

    breadCrumb: {
      fontWeight: 'bold',
      fontSize: 12,
      letterSpacing: 0.75
    },

    colleaguesTitle: {
      fontWeight: 'bold',
      fontSize: 16,
      letterSpacing: 1,
    },
    findColleagues: {
      fontWeight: 'bold',
      fontSize: 14,
      letterSpacing: 0.88,
      textAlign: 'left',
      paddingRight: 20
    },
    insertInfoColleagues: {
      fontSize: 14,
      letterSpacing: 0.78,
      textAlign: 'left'
    },
    detailButtonContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    detailButton: {
      textTransform: 'none',
      color: theme.palette.primary.red,
      borderRadius: 20,
      marginBottom: '8px',
      '&:hover': {
        color: theme.palette.primary.white,
        background: theme.palette.primary.red
      },
    },
    detailButtonLabel: {
      justifyContent: 'flex-end'
    },
    formField: {
      width: '100%'
    },
    formFieldInput: {
      padding: '6px 0',
    },
    formFieldInputLabel: {
      transform: 'translate(14px, 14px) scale(1)',
    },
    formFieldSelect: {
      marginTop: '16px',
      marginBottom: '8px',
    },
    select: {
      padding: '6px !important',
      '& :focus': {
        borderRadius: '4px !important',
        border: `1px solid ${theme.palette.primary.inputBorder} !important`,
        backgroundColor: theme.palette.primary.white
      }
    },
    selectLabel: {
      // '&$focused': {
      color: 'purple !important',
      transform: 'translate(0px, -20px) scale(1) !important',
      // },
    },

    cssOutlinedInput: {
      borderColor: `${theme.palette.primary.inputBorder} !important`,
      '& legend': {
        width: '0 !important'
      }
    },
    cssFocused: {
      '&$cssFocused': {
        color: 'purple',
        transform: 'translate(0px, -20px) scale(1)',
      },
    },
    inputContainer: {
      display: 'flex'
    },
    avatar: {
      height: 104,
      width: 104,
    }











    // textDark: {
    //   color: theme.palette.primary.text,
    // },
    // welcomeTitle: {
    //   fontSize: 16,
    //   letterSpacing: 1,
    // },
    // paperCalendar: {
    //   // padding: theme.spacing.unit * 2,
    //   textAlign: 'center',
    //   // color: theme.palette.text.secondary,
    //   borderRadius: 10,
    //   background: theme.palette.primary.main,
    //   boxShadow: '0 4px 8px 0 rgba(48,49,51,0.1)',
    // },
    // gridPaddingBottom: {
    //   paddingBottom: 30
    // },
    // ctaGrid: {
    //   paddingBottom: 80
    // },
    // ctaPatient: {
    //   height: 167,
    //   textAlign: 'center',
    //   // alignItems: 'top',
    //   borderRadius: 10,
    //   background: theme.palette.primary.main,
    //   boxShadow: '0 8px 16px 0 rgba(48,49,51,0.1)',
    //   // color: 'green'
    //   '&:hover': {
    //     background: 'linear-gradient(180deg, #E82758 0%, #FE4641 100%)',
    //     boxShadow: '0 8px 16px 0 rgba(254,70,65,0.33)',
    //     color: theme.palette.primary.white,
    //   }
    // },
    // ctaPatientText: {
    //   paddingTop: 15,
    //   fontSize: 16,
    //   // lineHeight: '42px',
    //   letterSpacing: 1
    // },

    // gridMaterialsCalendar: {
    //   //
    // },
    // cardTitle: {
    //   paddingBottom: 30,
    //   fontSize: 16,
    //   letterSpacing: 1
    // },
    // tabs: {
    //   boxShadow: ' 0 4px 8px 0 rgba(48,49,51,0.1)',
    // },
    // tab: {
    //   textTransform: 'none',
    //   fontSize: 14,
    //   fontWeight: 600,
    //   letterSpacing: 0.26,
    //   padding: 16,
    // },
    // tabSelected: {
    //   color: theme.palette.primary.red,
    // },
    // tabRadiusSx: {
    //   borderRadius: '10px 0 0 0',
    // },
    // tabRadiusDx: {
    //   borderRadius: '0 10px 0 0',
    // },
    // cardMaterials: {
    //   padding: 0
    // },
    // materialsList: {
    //   padding: 0
    // },
    // materialsListItem: {
    //   borderBottom: `1px solid ${theme.palette.primary.lightGrey}`,
    //   '&:hover': {
    //     backgroundColor: '#F9F9F9',
    //   },
    //   padding: '50px 30px'
    // },
    // materialsListItemTitleContainer: {
    //   display: 'flex',
    //   alignItems: 'center',
    //   paddingBottom: '10px !important',
    // },
    // materialsListItemTitle: {
    //   fontSize: 18,
    //   letterSpacing: 1,
    //   fontWeight: 'bold',
    //   padding: 5
    // },
    // materialsListItemTitleWarning: {
    //   padding: 5,
    //   fontSize: 12,
    //   letterSpacing: 0.3,
    //   color: theme.palette.primary.red,
    // },
    // materialsListItemBigNumber: {
    //   fontSize: 48,
    //   letterSpacing: 1,
    //   fontWeight: 'bold',
    //   padding: 5
    // },
    // materialsListItemBigNumberDesc: {
    //   fontSize: 14,
    //   letterSpacing: 0.26,
    //   color: theme.palette.primary.grey,
    // },
    // detailButtonContainer: {
    //   display: 'flex',
    //   alignItems: 'flex-end',
    // },
    // detailButton: {
    //   textTransform: 'none',
    //   color: theme.palette.primary.red,
    //   borderRadius: 20,
    //   fontWeight: 'bold',
    //   '&:hover': {
    //     color: theme.palette.primary.white,
    //     background: theme.palette.primary.red
    //   },
    // },
    // detailButtonLabel: {
    //   justifyContent: 'flex-end'
    // },
    // allMaterialsButton: {
    //   justifyContent: 'center',
    //   color: theme.palette.primary.red,
    //   borderRadius: '0 0 10px 10px',
    //   padding: '30px 0',
    //   fontSize: 16,
    //   letterSpacing: 1,
    //   '&:hover': {
    //     color: theme.palette.primary.white,
    //     background: theme.palette.primary.red
    //   },
    // },
    // calendar: {
    //   // padding: theme.spacing.unit * 2,
    //   padding: 20,
    // },
    // appointmentsTitle: {
    //   marginRight: 'auto',
    // },
    // expandButton: {
    //   color: theme.palette.primary.red,
    // },
    // appointmentsTitleContainer: {
    //   borderBottom: `1px solid ${theme.palette.primary.lightGrey}`,
    //   margin: '0 16px 16px 16px',
    //   width: 'auto',
    //   paddingBottom: 5
    // },
    // appointmentsDWM: {
    //   borderRadius: 20,
    //   color: theme.palette.primary.grey
    // },
    // appointments: {
    //   // padding: 0,
    // },
    // appointmentsListItem: {
    //   '&:hover': {
    //     backgroundColor: '#F9F9F9',
    //   }
    // },
    // appointmentsListItemText: {
    //   fontSize: 14,
    //   letterSpacing: 0.26,
    // },
    // appointmentsListItemGrid: {
    //   // padding: 0,
    // },
    // appointmentsListItemCheckbox: {
    //   // paddingRight: 0
    // },
    // summary: {

    // },
    // summaryItem: {

    // }
  }
  );

export default styles;