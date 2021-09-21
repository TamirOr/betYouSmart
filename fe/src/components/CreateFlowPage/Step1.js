import React, {Fragment, useContext, useState} from "react";
import {Link} from "react-router-dom";
import {MenuItem, Select} from "@material-ui/core";
import {FlowContext} from "./CreateFlowPage";
import axios from "axios";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import "react-date-range/dist/styles.css";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    button: {
        display: "block",
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 270,
    },
}));

function Step1() {
    const {
        sport,
        setSport,
        league,
        setLeague,
        date,
        setDate,
        game,
        setGame,
    } = useContext(FlowContext);

    const classes = useStyles();
    const [leagueList, setLeagueList] = useState([]);
    const [openSport, setOpenSport] = React.useState(false);
    const [gameList, setGameList] = useState([]);
    const [openLeague, setOpenLeague] = React.useState(false);
    const [openGames, setOpenGames] = React.useState(false);
    const handleSubmit = () => {
        console.log("Sport", {sport});
        console.log("league", {league});
        console.log("date", {date});
        console.log("game", {game});
        console.log("sport", {sport});
    };

    const handleCloseSport = () => {
        setOpenSport(false);
    };

    const handleOpenSport = () => {
        setOpenSport(true);
    };

    const handleCloseLeagues = () => {
        setOpenLeague(false);
    };

    const handleOpenLeagues = () => {
        setOpenLeague(true);
    };

    const handleCloseGames = () => {
        setOpenGames(false);
    };

    const handleOpenGames = () => {
        setOpenGames(true);
    };

    const prepareHeadersWithToken = () => {
        return {
            headers: {
                'Authorization': `token ${localStorage.getItem('token')}`
            }
        }
    }

    const handleSelectedSport = async (event) => {
        axios
            .get(`http://localhost:8000/api/leagues/${event.target.value}`, prepareHeadersWithToken())
            .then((res) => {
                console.log(res);
                setLeagueList(Object.keys(res.data.leagues).slice(0, 50));
            });
        setSport(event.target.value);
    };

    const handleSelectedLeague = async (event) => {
        setLeague(event.target.value);
    };

    const handleSelectedDate = (event) => {
        let month = event.getMonth() + 1;
        month = month > 9 ? month : "0" + month;
        let date = event.getFullYear() + "-" + month + "-" + event.getDate();
        axios
            .get(`http://localhost:8000/api/games/${sport}/${league}/${date}`, prepareHeadersWithToken())
            .then((res) => {
                setGameList(Object.values(res.data));
            });
        setDate(event.getTime());
    };

    const handleSelectedGame = async (event) => {
        let gameId = Object(event.target.value.game_id);
        axios
            .get(`http://localhost:8000/api/game/${sport}/${gameId}`, prepareHeadersWithToken())
            .then((res) => {
                setGame(Object(res.data[0]));
            });
    };

    return (
        <Fragment
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <h2>Choose your game</h2>
            <form>
                <div>
                    <Button className={classes.button} onClick={handleOpenSport}>
                        Choose Type Of Sport
                    </Button>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">
                            Sport
                        </InputLabel>
                        <Select
                            labelId="sport"
                            id="demo-controlled-open-select"
                            open={openSport}
                            onClose={handleCloseSport}
                            onOpen={handleOpenSport}
                            value={sport}
                            onChange={handleSelectedSport}
                        >
                            <MenuItem value={1}>Football</MenuItem>
                            <MenuItem value={2}>BasketBall</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <Button className={classes.button} onClick={handleOpenLeagues}>
                        Choose League
                    </Button>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">
                            leagues
                        </InputLabel>
                        <Select
                            labelId="league"
                            id="demo-controlled-open-select"
                            open={openLeague}
                            onClose={handleCloseLeagues}
                            onOpen={handleOpenLeagues}
                            value={league}
                            onChange={handleSelectedLeague}
                        >
                            {leagueList &&
                            leagueList.map((e, key) => (
                                <MenuItem value={e} key={key}>
                                    {e}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justifyContent="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            format="yyyy-MM-dd"
                            value={date}
                            onChange={handleSelectedDate}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>

                <div>
                    <Button className={classes.button} onClick={handleOpenGames}>
                        Choose game
                    </Button>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">
                            games
                        </InputLabel>
                        <Select
                            labelId="game"
                            id="demo-controlled-open-select"
                            open={openGames}
                            onClose={handleCloseGames}
                            onOpen={handleOpenGames}
                            value={game.name}
                            onChange={handleSelectedGame}
                        >
                            {gameList &&
                            gameList.map((e, key) => (
                                <MenuItem value={e} key={key}>
                                    {e.game}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </form>
            <Link to="/admin/create/step2" onClick={handleSubmit}>
                <Button variant="contained" color="primary" disableElevation>
                    Let's choose about what we Gambling
                </Button>
            </Link>
        </Fragment>
    );
}

export default Step1;
