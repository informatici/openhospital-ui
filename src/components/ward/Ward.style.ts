import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },

    gridContainer: {
      margin: "0 auto",
      paddingTop: 30,
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
    },

    buttonLabel: {
      justifyContent: "center",
      width: 75,
      height: 30,
    },

    loadMoreButton: {
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
    },

    divider: {
      backgroundColor: "#8D8D8D",
      width: "100%",
    },

    inputContainer: {
      display: "flex",
    },

    findWard: {
      fontWeight: "bold",
      fontSize: 25,
      letterSpacing: 0.88,
      textAlign: "left",
      paddingRight: 20,
    },

    avatar: {
      height: 104,
      width: 104,
      margin: "0 auto",
      border: "4px solid #e6e6e6",
      "&.avatarSmall": {
        height: 44,
        width: 44,
        margin: 0,
      },
    },

    paper: {
      padding: 0,
      textAlign: "center",
      borderRadius: 10,
      background: theme.palette.primary.main,
      boxShadow: "0 4px 8px 0 rgba(48,49,51,0.1)",
    },

    paperFlat: {
      padding: "25px",
      textAlign: "center",
      borderRadius: "none",
      background: theme.palette.primary.main,
      boxShadow: "none",
      width: "100%",
    },

    breadCrumb: {
      fontWeight: "bold",
      fontSize: 12,
      letterSpacing: 0.75,
    },

    filterContainer: {
      paddingTop: "40px !important",

      margin: "auto",
    },

    wardTitle: {
      fontWeight: "bold",
      fontSize: 16,
      letterSpacing: 1,
    },

    wardLink: {
      fontWeight: "bold",
      fontSize: 25,
      letterSpacing: 1,
      width: "100%"
    },

    boxInfo: {
      display: "flex",
      height: "155px",
      width: "150px",
    },

    boxItem: {
      display: "tablecell",
      flex: 1,
      textAlign: "center",
      borderRadius: 0,
      boxShadow: "none",
      border: "1px solid ",
    },

    numberOf: {
      fontSize: 48,
      fontWeight: "bold",
      letterSpacing: 1,
    },

    object: {
      fontSize: 12,
      fontWeight: "bold",
      letterSpacing: 0.26,
      marginTop: -1,
    },

    subTitle: {
      fontSize: 9,
      fontWeight: "bold",
      letterSpacing: 0.2,
    },

    findPatient: {
      fontWeight: "bold",
      fontSize: 20,
      letterSpacing: 0.88,
      textAlign: "left",
      paddingRight: 20,
    },

    findSubtitle: {
      fontSize: 14,
      letterSpacing: 0.78,
      textAlign: "left",
    },

    formField: {
      width: "100%",
    },
  });

export default styles;
