import { makeStyles } from "@mui/styles";

export default makeStyles(theme => ({
<<<<<<< HEAD

=======
>>>>>>> dima
    paper: {
        margin: "24px 0",
        backgroundColor: "#f3f3f3",
    },
    virtualEnv: {
        marginBottom: 64
    },
    test: {
        marginBottom: "3%"
    },
    testButtons: {
        marginTop: -12,
        marginBottom: 48,
    },
    testHeader: {
        padding: 36,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: 1280,
    },
    testCheckbox: {
        paddingBottom: 6,
        paddingTop: 6,
    },
    testCheckboxLabel: {
        lineHeight: 1.3
    },
    codeEditor: {
        margin: 27
    },
    progressBar: {
        flexGrow: 1,
        marginBottom: "6px",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    barColorPromary: {
        backgroundColor: "#00C9FF"
    },
    dataStreamButton: {
        margin: 24
    },
    checkmarkPrimary: {
        color: "#00C9FF",
        fontSize: 20,
        marginRight: 10
    },
    checkmarkSecondary: {
        color: "#00C9FF",
        fontSize: 16,
        marginRight: 10,
        marginLeft: 18,
    },
    iconSecondary: {
        fontSize: 20,
        marginRight: 10
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
    contentText: {
<<<<<<< HEAD

        "& > *": {
            marginBottom: 12,
            fontFamily: "Roboto",
            boxSizing: "border-box",
        },
        "& section": {
            width: "100%",
            marginBottom: 40,
        },
        "& section:last-child": {
            marginBottom: 12,
        },
        "& h4": {
=======
        "& > *": {
            marginBottom: 12,
            fontFamily: "Roboto"
        },
        "& > p": {
>>>>>>> dima
            marginBottom: 12,
            marginTop: 12,
        },
        "& p": {
            marginBottom: 12,
            marginTop: 12,
<<<<<<< HEAD
            lineHeight: 1.43,
        },
        "& > p": {
            marginBottom: 12,
            marginTop: 12,
        },
        "& .code": {
            fontSize: "1rem",
            lineHeight: 1.5,
            backgroundColor: "#f8f7f2",
            color: "#4A4A4A",
        },
        "& .strong-text": {
            fontWeight: "bold",
        },
        "& .italics-text": {
            fontStyle: "italic",
        },
        "& .center-text": {
            textAlign: "center",
        },
        "& a": {
            margin: 0,
            target: "_blank",
            rel: "noopener noreferrer",
            color: "rgb(55, 111, 208)",
            textDecoration: "none",
            cursor: "pointer",
        },
        "& a:hover": {
            borderBottom: "1px solid rgb(55, 111, 208)",
        },

        "& ul": {
            listStyleType: "disc",
            marginLeft: 24,
            marginTop: 6,
            marginBottom: 18,
        },
        "& ol": {
            listStyleType: "decimal",
            marginLeft: 24,
            marginTop: 6,
            marginBottom: 18,
=======
        },
        "& > .colored-frame": {
            marginTop: 12,
            marginBottom: 0,
            paddingLeft: 24,
            paddingRight: 12,
            borderStyle: "solid",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#E0E0E0",
            backgroundColor: "#F9F9FC",
        },
        "& > .caption": {
            marginBottom: 18,
            marginTop: 6,
        },
        "& ul": {

            marginLeft: 24,
            marginTop: 6,
            marginBottom: 18,
            listStyleType: "disc",
        },
        "& ol": {
            marginLeft: 24,
            marginTop: 6,
            marginBottom: 18,
            listStyleType: "decimal",
>>>>>>> dima
        },
        "& li": {
            marginBottom: 6,
        },
<<<<<<< HEAD
        "& > .caption": {
            marginBottom: 18,
            marginTop: 6,
        },
        "& > .colored-frame": {
            marginTop: 12,
            marginBottom: 0,
            paddingLeft: 24,
            paddingRight: 12,
            backgroundColor: "#F9F9FC",
            borderStyle: "solid",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#E0E0E0",
        },
        "& .img-max-width": {
            width: "100%",
            height: "auto",
        },
        "& .img-half-width": {
            display: "block",
            width: "50%",
            height: "auto",
            margin: "10px auto",
        },

        "& table": {
            width: "100%",
            marginBottom: 12,
            borderCollapse: "collapse",
        },
        "& th td": {
            border: "1 solid black",
            padding: "10px 15px",
            textAlign: "center",
        },
        "& iframe": {
            width: 800,
            height: 450,
            align: "absmiddle",
            frameBorder: 0,
        },

    }
=======
        "& h2": {
            marginTop: 48,

        },
        "& a": {
            target: "_blank",
            rel: "noopener noreferrer",
        },

    },
>>>>>>> dima
}));