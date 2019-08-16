import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },

    gridContainer: {
      margin: "0 auto",
      paddingTop: 60,
    },

    gridContainerBody: {
      margin: "0 auto",
    },

    divider: {
      backgroundColor: "#8D8D8D",
      // opacity: 0.2,
      width: "100%",
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

    overlay: {
      position: "relative",
      top: "300px",
      left: "20px",
      color: "white",
      fontWeight: "bold",
    },

    breadCrumb: {
      fontWeight: "bold",
      fontSize: 12,
      letterSpacing: 0.75,
    },

    newsTitle: {
      fontWeight: "bold",
      fontSize: 20,
      letterSpacing: 1,
    },

    newsTitlePost: {
      fontWeight: "bold",
      fontSize: 20,
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
      height: 450,
    },

    mediaArticles: {
      height: 143,
      width: 265,
      borderRadius: 5
    },

    /// Overlay text on image ///

    newsDateOverlay: {
      fontWeight: "bold",
      fontSize: 15,
      letterSpacing: 1,
    },

    newsTitleOverlay: {
      fontWeight: "bold",
      fontSize: 30,
      letterSpacing: 1,
    },

    newsSignOverlay: {
      fontWeight: "bold",
      fontSize: 15,
      letterSpacing: 1,
      marginBottom: 20,
    },

    ////////////////////////////

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
      paddingLeft: "10px",
      paddingBottom: "10px",
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
      width: "25%",
      padding: "10px",
      alignSelf: "auto",
      display: "initial",
    },

    formatNewsPost: {
      float: "left",
      width: "75%",
      padding: "10px",
      alignSelf: "auto",
      display: "flex",
    },

    cardAction: {
      borderBottom: `1px solid ${theme.palette.primary.lightGrey}`,
      "&:hover $avatar": {
        border: `4px solid ${theme.palette.primary.red}`,
      },
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
      float: "right",
    },

    addNewsButton: {
      float: "right",
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
