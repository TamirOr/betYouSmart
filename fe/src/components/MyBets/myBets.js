import React, {useEffect, useState} from "react";
import {withStyles, makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
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


export default function MyBets() {
    const classes = useStyles();
    const [info, setInfo] = useState([]);

    useEffect(() => {
        const asyncUseEffect = async () => {
            const res = await axios.get("http://localhost:8000/api/bets?all_bets", prepareHeadersWithToken());
            setInfo(Object.values(res.data));
            console.log(info);
        };
        asyncUseEffect();
    }, []);

    const prepareHeadersWithToken = () => {
        return {
            headers: {
                'Authorization': `token ${localStorage.getItem('token')}`
            }
        }
    }

    const presentCreatorGuess = (guess, teamA, teamB) => {
        if (guess === 0)
            return "Draw";
        else if (guess === 1)
            return teamA;
        else
            return teamB
    }

    const handlePrivacy = (privacy) => {
        return privacy === false ? "Public" : "Private";
    }

    const handleActive = (active) => {
        return active === true ? "still active" : "Inactive";
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Contract Address</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">Privacy</StyledTableCell>
                        <StyledTableCell align="center">Game</StyledTableCell>
                        <StyledTableCell align="center">Date</StyledTableCell>
                        <StyledTableCell align="center">Your Guess</StyledTableCell>
                        <StyledTableCell align="center">Your Budget</StyledTableCell>
                        <StyledTableCell align="center">Ratio</StyledTableCell>
                        <StyledTableCell align="center">
                            How Much You Can Win
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {info.map((row) => (
                        <StyledTableRow key={row.contract_address}>
                            <StyledTableCell component="th" scope="row">
                                {row.contract_address}
                            </StyledTableCell>
                            <StyledTableCell align="center">{handleActive(row.active)}</StyledTableCell>
                            <StyledTableCell align="center">{handlePrivacy(row.private)}</StyledTableCell>
                            <StyledTableCell align="center">{row.game}</StyledTableCell>
                            <StyledTableCell align="center">{row.date}</StyledTableCell>
                            <StyledTableCell align="center">
                                {presentCreatorGuess(row.creatorGuess, row.team_a, row.team_b)}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.creatorBudget}
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
