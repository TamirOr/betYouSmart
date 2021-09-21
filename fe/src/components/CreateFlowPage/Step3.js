import React, {useContext, useEffect, useState} from "react";
import {FlowContext} from "./CreateFlowPage";
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import getWeb3 from "../Web3/getWeb3";
import BetManager from "../../contracts/BetManager.json";
import Bet from "../../contracts/Bet.json";

const useStyles = makeStyles({
    root: {
        width: "100%",
        maxWidth: 800,
    },
});

function Step3() {
    const classes = useStyles();
    const {
        sport,
        league,
        date,
        game,
        privacy,
        budget,
        guess,
        ratio,
        walletAddress,
    } = useContext(FlowContext);

    const [accounts, setAccounts] = useState([]);
    const [networkId, setNetworkId] = useState("");
    const [betManager, setBetManager] = useState([]);
    const [bet, setBet] = useState([]);
    let contractAddress;

    const prepareHeadersWithToken = () => {
        return {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
    }

    const [data, setData] = useState([]);
    useEffect(() => {
        const firstAsyncUseEffect = async () => {
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const res = await web3.eth.getAccounts();
            setAccounts(res);
            //const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const net = await web3.eth.net.getId();
            setNetworkId(net);

            const bm = new web3.eth.Contract(
                BetManager.abi,
                BetManager.networks[networkId] && BetManager.networks[networkId].address
            );
            setBetManager(bm);

            const b = new web3.eth.Contract(
                Bet.abi,
                Bet.networks[networkId] && Bet.networks[networkId].address
            );

            setBet(b);

            console.log(web3);
            console.log(accounts);
            console.log(networkId);
            console.log(betManager);
            console.log(bet);
        };
        firstAsyncUseEffect();

        const uuid = uuidv4().toString();
        const asyncUseEffect = async () => {
            let result = await betManager.methods
                .createBet(walletAddress, budget, ratio, date, guess, budget, uuid)
                .send({from: accounts[0]});
            console.log(result);
            alert(
                "Send " +
                budget +
                " Wei to " +
                result.events.BetStep.returnValues._address
            );
        };
        asyncUseEffect();
        contractAddress = betManager.methods.getContractAddress(uuid);

        const jsonBody = createJson(uuid, contractAddress);
        axios.post("http://localhost:8000/api/bet", jsonBody, prepareHeadersWithToken()).then((res) => {
            setData(res);
            console.log(res);
        });
        console.log(data);
    }, []);

    const createJson = (uuid, contractAddress) => {
        const teamA = game.teams.home.name;
        const teamB = game.teams.away.name;
        const gameTitle = `${teamA} Vs ${teamB}`;
        const participantMaxPossibleBudget = budget / ratio;
        return JSON.stringify({
            uuid: uuid,
            sport_type: sport,
            league: league,
            time_stamp: date,
            game: gameTitle,
            team_a: teamA,
            team_b: teamB,
            private: privacy,
            creatorBudget: budget,
            creatorGuess: guess,
            ratio: ratio,
            participantMaxPossibleBudget: participantMaxPossibleBudget,
            wallet_address: walletAddress,
            contract_address: contractAddress,
        });
    };

    let pr =
        privacy === 0
            ? "Public- Your Bet will shown on Bet You Smart"
            : "Unlisted- Only people with the contract Address can join";

    return (
        <div className={classes.root}>
            <Typography variant="h1" component="h2" align="center">
                Good Luck
            </Typography>
            <Typography variant="h3" align="center" gutterBottom>
                Here are your contract details
            </Typography>
            <Typography variant="h5" align="center" gutterBottom>
                League: {league}
            </Typography>
            <Typography variant="h5" align="center" gutterBottom>
                Game: {game.teams.home.name} Vs {game.teams.away.name}
            </Typography>
            <Typography variant="h5" align="center" gutterBottom>
                your contract is: {pr}
            </Typography>
            <Typography variant="h5" align="center" gutterBottom>
                Budget: {budget}
            </Typography>
            <Typography variant="h5" align="center" gutterBottom>
                Your guess: {guess}
            </Typography>
            <Typography variant="h5" align="center" gutterBottom>
                Ratio: {ratio}
            </Typography>
            <Typography variant="h5" align="center" gutterBottom>
                Contract Address: {contractAddress}
            </Typography>
        </div>
    );
}

export default Step3;
