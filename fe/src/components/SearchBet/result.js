import React, {useContext, useEffect, useState} from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {SearchContext} from "./SearchFlowPage";
import axios from "axios";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});


export default function Result() {
    debugger;
    const classes = useStyles();
    const [info, setInfo] = useState([]);
    const {
        paramType, val,
    } = useContext(SearchContext);
    useEffect(() => {
        debugger;
        const asyncUseEffect = async () => {
            axios
                .get(`http://localhost:8000/api/bets`, prepareHeadersWithToken(paramType, val))
                .then((res) => {
                    debugger;
                    setInfo(Object.values(res.data));
                    // data = Object.values(res.data);
                });
        };
        asyncUseEffect();
    }, []);

    const prepareHeadersWithToken = (type, value) => {
        if (type === "team") {
            return {
                headers: {
                    'Authorization': `token ${localStorage.getItem('token')}`
                },
                params: {
                    team: value
                },
            }
        } else if (type === "date") {
            return {
                headers: {
                    'Authorization': `token ${localStorage.getItem('token')}`
                },
                params: {
                    date: value
                },
            }
        } else {
            return {
                headers: {
                    'Authorization': `token ${localStorage.getItem('token')}`
                },
                params: {
                    contract_address: value
                },
            }
        }
    }


    const presentCreatorGuess = (guess, teamA, teamB) => {
        if (guess === 1)
            return teamB + " Or Draw";
        else if (guess === 0)
            return teamA + " Or " + teamB;
        else
            return teamB + "Or Draw";
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Contract Address</StyledTableCell>
                        <StyledTableCell align="center">Game</StyledTableCell>
                        <StyledTableCell align="center">Date</StyledTableCell>
                        <StyledTableCell align="center">Bet Options</StyledTableCell>
                        <StyledTableCell align="center">Ratio</StyledTableCell>
                        <StyledTableCell align="center">
                            Maximum Possible Profit
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {info.map((row) => (
                        <StyledTableRow key={row.contract_address}>
                            <StyledTableCell component="th" scope="row">
                                {row.contract_address}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.game}</StyledTableCell>
                            <StyledTableCell align="center">{row.date}</StyledTableCell>
                            <StyledTableCell align="center">
                                {presentCreatorGuess(row.creatorGuess, row.team_a, row.team_b)}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.ratio}</StyledTableCell>
                            <StyledTableCell align="center">
                                {row.participantMaxPossibleBudget}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
