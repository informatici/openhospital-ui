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

    divider: {
      backgroundColor: "#8D8D8D",
      width: "98%",
    },

    paper: {
      padding: 10,
      textAlign: "left",
      borderRadius: 10,
      background: theme.palette.primary.main,
      boxShadow: "0 4px 8px 0 rgba(48,49,51,0.1)",
    },

    paperFlat: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      borderRadius: "none",
      background: theme.palette.primary.main,
      boxShadow: "none",
      width: "25%",
    },

    gridContainerFilter: {
      margin: "0 auto",
      paddingTop: 60,
      float: "right",
    },

    breadCrumb: {
      fontWeight: "bold",
      fontSize: 12,
      letterSpacing: 0.75,
    },

    newsImage: {
      height: "100px",
      width: "60px",
    },

    newsTitlePost: {
      fontWeight: "bold",
      fontSize: 20,
      letterSpacing: 1,
    },

    newsTitle: {
      fontWeight: "bold",
      fontSize: 16,
      letterSpacing: 1,
    },

    newsDate: {
      fontWeight: "bold",
      fontSize: 12,
      letterSpacing: 1,
    },

    newsSign: {
      fontWeight: "bold",
      fontSize: 10,
      letterSpacing: 1,
      marginBottom: 20,
    },

    media: {
      height: 132,
      width: 235,
    },

    readMore: {
      fontWeight: "bold",
      fontSize: 12,
      letterSpacing: 1,
    },

    inputContainer: {
      display: "flex",
    },

    findNews: {
      fontWeight: "bold",
      fontSize: 20,
      letterSpacing: 0.88,
      textAlign: "left",
      paddingRight: 20,
    },

    findNewsFilter: {
      fontWeight: "bold",
      fontSize: 20,
      letterSpacing: 0.88,
      textAlign: "left",
      paddingRight: 20,
      paddingLeft: 200,
    },

    formField: {
      width: "100%",
    },

    formFieldSelect: {
      marginTop: "16px",
      marginBottom: "8px",
    },

    formFieldSelectInput: {
      padding: "6px 0 !important",
    },

    select: {
      padding: "6px 0 !important",
      "& :focus": {
        borderRadius: "6px !important",
        border: "1px solid",
        backgroundColor: theme.palette.primary.white,
        padding: "6px 0 !important",
      },
    },

    formatNewsCard: {
      width: "19%",
      padding: "10px",
      display: "inline-table",
    },

    cardAction: {
      borderBottom: `1px solid ${theme.palette.primary.lightGrey}`,
      "&:hover $avatar": {
        border: `4px solid ${theme.palette.primary.red}`,
      },
    },

    filterContainer: {
      paddingTop: "40px !important",
      margin: "auto",
      width: "30%",
    },

    newsContainer: {
      paddingTop: 20,
      paddingBottom: 10,
      "& $infoContainer": {
        padding: "5pxd 12px",
        textAlign: "left",
      },
    },

    buttonLabel: {
      justifyContent: "flex-end",
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

    loadMoreContainer: {
      display: "flex",
      justifyContent: "center",
    },
  });

export default styles;
