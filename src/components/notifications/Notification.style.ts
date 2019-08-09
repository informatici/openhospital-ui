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

    notificationTitle: {
      fontWeight: "bold",
      fontSize: 16,
      letterSpacing: 1,
    },

    paper: {
      padding: 0,
      textAlign: "center",
      borderRadius: 10,
      background: theme.palette.primary.main,
      boxShadow: "0 4px 8px 0 rgba(48,49,51,0.1)",
    },

    paperFlat: {
      // display: 'flex',
      padding: theme.spacing.unit * 2,
      textAlign: "left",
      // color: theme.palette.text.secondary,
      borderRadius: "none",
      background: theme.palette.primary.main,
      boxShadow: "none",
      width: "100%",
    },

    newsContainer: {
      paddingTop: 20,
      paddingBottom: 10,
      "& $infoContainer": {
        padding: "5pxd 12px",
      },
    },

    notificationTitlePost: {
      fontWeight: "bold",
      fontSize: 20,
      letterSpacing: 1,
    },

    notificationDate: {
      fontWeight: "bold",
      fontSize: 12,
      letterSpacing: 1,
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

    deleteButton: {
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
      width: 500,
    },

    loadMoreContainer: {
      display: "flex",
      justifyContent: "center",
    },

    loadMorebutton: {
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
  });

export default styles;
