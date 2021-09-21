import React, {Fragment, useContext} from "react";
import {makeStyles} from "@material-ui/core/styles";

// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import SearchBar from "material-ui-search-bar";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import {SearchContext} from "./SearchFlowPage";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

const styles = {
    typo: {
        paddingLeft: "25%",
        marginBottom: "40px",
        position: "relative",
    },
    note: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        bottom: "10px",
        color: "#c0c1c2",
        display: "block",
        fontWeight: "400",
        fontSize: "13px",
        lineHeight: "13px",
        left: "0",
        marginLeft: "20px",
        position: "absolute",
        width: "260px",
    },
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
    },
};

const useStyles = makeStyles(styles);


export default function SearchBet() {
    const {
        setParamType, setValue,
    } = useContext(SearchContext);


    const [searchDateValue, setSearchDateValue] = React.useState('');
    const [searchContractValue, setSearchContractValue] = React.useState('');
    const [searchTeamValue, setSearchTeamValue] = React.useState('');
    const handleSearch = (type, value) => {
        setParamType(type);
        setValue(value);
    };


    const classes = useStyles();
    return (
        <Fragment>
            <Card>
                <CardHeader color="success">
                    <p className={classes.cardCategoryWhite}>
                        Search by contract address
                    </p>
                    <SearchBar
                        value={searchContractValue}
                        onChange={(newValue) => {
                            setSearchContractValue(newValue);
                            handleSearch("contract", newValue);
                        }}
                    />
                </CardHeader>
            </Card>
            <Card>
                <CardHeader color="info">
                    <p className={classes.cardCategoryWhite}>
                        Search by team
                    </p>
                    <SearchBar
                        value={searchTeamValue}
                        onChange={(newValue) => {
                            setSearchTeamValue(newValue);
                            handleSearch("team", newValue);
                        }}
                    />
                </CardHeader>
            </Card>
            <Card>
                <CardHeader color="rose">
                    <p className={classes.cardCategoryWhite}>
                        Search by date
                    </p>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justifyContent="space-around">
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                format="yyyy-MM-dd"
                                value={searchDateValue}
                                onChange={(newValue) => {
                                    setSearchDateValue(newValue);
                                    handleSearch("date", newValue)
                                }}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}

                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </CardHeader>
                <CardBody>

                </CardBody>
            </Card>
            <Link to="/admin/result">
                <Button variant="contained" color="primary" disableElevation>
                    Search
                </Button>
            </Link>
        </Fragment>
    );
}
