import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            // marginTop: 50
        },
        paper: {
            // padding: theme.spacing.unit * 2,
            textAlign: 'center',
            // color: theme.palette.text.secondary,
            borderRadius: 10,
            padding: 0,
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

        patientsTitle: {
            fontWeight: 'bold',
            fontSize: 16,
            letterSpacing: 1,
            marginRight: 'auto'
        },
        findPatients: {
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: 0.88,
            textAlign: 'left',
            paddingRight: 20
        },
        insertInfoPatients: {
            fontSize: 14,
            letterSpacing: 0.78,
            textAlign: 'left'
        },
        searchButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        button: {
            textTransform: 'none',
            color: theme.palette.primary.red,
            fontWeight: 'bold',
            borderRadius: 20,
            '&:hover': {
                color: theme.palette.primary.white,
                background: theme.palette.primary.red
            },
            '&.mergeButton,&.addButton': {
                marginLeft: 40
            }
        },
        buttonIcon: {
            marginRight: 5,
        },
        buttonLabel: {
            justifyContent: 'flex-end',
        },
        formField: {
            width: '100%',
        },
        formDeleteField: {
            width: '50%',
            justifyContent: 'center'
        },

        deleteInputField: {
            paddingLeft: "165px",
            width: '104%'
        },

        formFieldInput: {
            padding: '6px 0',
            '& input': {
                padding: 6
            }
        },
        formFieldInputLabel: {
            transform: 'translate(14px, 14px) scale(1)',
        },
        formFieldSelect: {
            marginTop: '16px',
            marginBottom: '8px',
        },
        formFieldSelectInput: {
            padding: '6px 0 !important'
        },
        select: {
            padding: '6px 0 !important',
            '& :focus': {
                borderRadius: '6px !important',
                border: `1px solid ${theme.palette.primary.inputBorder} !important`,
                backgroundColor: theme.palette.primary.white,
                padding: '6px 0 !important',
            }
        },
        selectLabel: {
            // '&$focused': {
            // color: 'purple !important',
            transform: 'translate(0px, -20px) scale(1) !important',
            // },
        },
        cardAction: {
            borderBottom: `1px solid ${theme.palette.primary.lightGrey}`,
            '&:hover $avatar': {
                border: `4px solid ${theme.palette.primary.red}`,
            }
        },

        cssOutlinedInput: {
            borderColor: `${theme.palette.primary.inputBorder} !important`,
            '& legend': {
                width: '0 !important'
            }
        },
        cssFocused: {
            '&$cssFocused': {
                // color: 'green',
                transform: 'translate(0px, -20px) scale(1)',
            },
        },
        inputContainer: {
            paddingTop: 20,
        },
        filterContainer: {
            paddingTop: '40px !important'
        },
        avatar: {
            height: 104,
            width: 104,
            margin: '0 auto',
            border: '4px solid #e6e6e6',
            '&.avatarSmall': {
                height: 57,
                width: 57,
                margin: 0,
            },
        },
        patientContainer: {
            paddingTop: 20,
            paddingBottom: 20,
            '& $infoContainer': {
                padding: '5pxd 12px',
                textAlign: 'left'
            }
        },
        patientName: {
            fontSize: 18,
            letterSpacing: 1,
            fontWeight: 'bold',
            padding: '10px 0',
        },
        infoContainer: {},
        patientActions: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
        },
        loadMoreContainer: {
            display: 'flex',
            justifyContent: 'center'
        },
        iconAndText: {
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
            padding: '5px 0'
        },
        divider: {
            backgroundColor: '#8D8D8D',
            // opacity: 0.2,
            width: '100%'
        },
    });

export default styles;