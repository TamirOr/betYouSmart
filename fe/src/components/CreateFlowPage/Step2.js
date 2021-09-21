import React, {Fragment, useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import {FlowContext} from "./CreateFlowPage";
import {MenuItem, Select} from "@material-ui/core";
import Button from "@material-ui/core/Button";

function Step2() {
    const {
        privacy,
        setPrivacy,
        budget,
        setBudget,
        guess,
        game,
        setGuess,
        ratio,
        setRatio,
        walletAddress,
        setWalletAddress,
    } = useContext(FlowContext);

    const [openGuess, setOpenGuess] = React.useState(false);


    useEffect(() => {
        console.log(game);
    }, [])
    const useStyles = makeStyles((theme) => ({
        root: {
            "& > *": {
                margin: theme.spacing(1),
                width: "25ch",
            },
        },
        button: {
            display: "block",
            marginTop: theme.spacing(2),
            align: "right",
        },
        formControl: {
            display: "flex",
            margin: theme.spacing(2),
            minWidth: 270,
        },
    }));

    const classes = useStyles();

    const handlePrivacyChange = (event) => {
        console.log(privacy);
        setPrivacy(event.target.value);
    };

    const handleBudgetChange = (event) => {
        console.log(budget);
        setBudget(event.target.value);
    };

    const handleCloseGuess = () => {
        setOpenGuess(false);
    };

    const handleOpenGuess = () => {
        setOpenGuess(true);
    };

    const teamA = game.teams.home.name;
    const teamB = game.teams.away.name;

    const handleRatioChange = (event) => {
        console.log(ratio);
        setRatio(event.target.value);
    };

    const handleWalletChange = (event) => {
        console.log(walletAddress);
        setWalletAddress(event.target.value);
    };

    const handleGuessChange = (event) => {
        console.log(guess);
        setGuess(event.target.value);
    };

    return (
        <Fragment>
            <h2>About What We Bet For?</h2>
            {game && <img src={game.teams.home.logo}/>}
            {game && <img src={game.teams.away.logo}/>}
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    id="budget"
                    label="Your Budget"
                    helperText="Remember: one Ether = one billion Gwei"
                    value={budget}
                    onChange={handleBudgetChange}
                />
                <TextField
                    id="ratio"
                    label="Ratio"
                    placeholder="Enter bet ratio"
                    helperText="You can select an accuracy ratio of up to one hundredth of a point"
                    value={ratio}
                    onChange={handleRatioChange}
                />
                <TextField
                    id="wallet"
                    label="enter your wallet Address"
                    placeholder="Wallet address . . ."
                    helperText="Don't worry we can only send money to your wallet, and not withdraw :)"
                    value={walletAddress}
                    onChange={handleWalletChange}
                />
                <Select
                    labelId="guess"
                    id="demo-controlled-open-select"
                    helperText="Who do you think is going to win?"
                    open={openGuess}
                    onClose={handleCloseGuess}
                    onOpen={handleOpenGuess}
                    value={guess}
                    onChange={handleGuessChange}
                >
                    <MenuItem value={1}>{teamA}</MenuItem>
                    <MenuItem value={2}>{teamB}</MenuItem>
                    <MenuItem value={0}>Draw</MenuItem>
                </Select>

                <FormControl component="fieldset">
                    <FormLabel component="legend">Privacy</FormLabel>
                    <RadioGroup
                        aria-label="privacy"
                        name="privacy"
                        helperText="Don't forget, anyone with the contract id could join to the contract."
                        value={privacy}
                        onChange={handlePrivacyChange}
                    >
                        <FormControlLabel value="0" control={<Radio/>} label="Public"/>
                        <FormControlLabel value="1" control={<Radio/>} label="Unlisted"/>
                    </RadioGroup>
                </FormControl>
            </form>
            <Link to="/admin/create/step1">
                <Button variant="contained" color="primary" disableElevation>
                    I want To change Game details
                </Button>
            </Link>

            <Link
                to="/admin/create/created"
                style={{display: "flex", marginLeft: "79"}}
            >
                <Button
                    variant="contained"
                    color="primary"
                    style={{float: "right"}}
                    disableElevation
                >
                    Create The Bet!
                </Button>
            </Link>
        </Fragment>
    );
}

export default Step2;
