import React, {Component, useEffect} from "react";
import Bet from "../../contracts/Bet.json";
import BetManager from "../../contracts/BetManager.json";
import getWeb3 from "./getWeb3";
import axios from "axios";


const updateContract = (bets) => {
    let address;
    let contract;
    for (let i = 0; i < bets.length; i++) {
        address = betManager.methods.getContractAddress(bets.uuid);
        contract = new this.web3.eth.Contract(Bet.abi, address);
        contract.methods.finishContract(bets.winner);


    }
}

const prepareHeadersWithToken = () => {
    return {
        headers: {
            'Authorization': `token ${localStorage.getItem('token')}`
        }
    }
}

const CheckUpdateGames = async () => {
    axios.get("http://localhost:8000/api/bets?finish", prepareHeadersWithToken()).then(res => {
        updateContract(Object.values(res.data));
    });
}


class initWeb3 extends Component {
    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            this.web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            this.accounts = await this.web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await this.web3.eth.net.getId();

            this.betManager = new this.web3.eth.Contract(
                BetManager.abi,
                BetManager.networks[networkId] && BetManager.networks[networkId].address
            );

            this.bet = new this.web3.eth.Contract(
                Bet.abi,
                Bet.networks[networkId] && Bet.networks[networkId].address
            );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({loaded: true});
            useEffect(() => {
                const interval = setInterval(() => {
                    CheckUpdateGames()
                }, 43200000); //check for new update every six hours
                return () => clearInterval(interval);
            }, []);
        } catch (error) {
            console.error(error);
        }
    };


}

export default initWeb3;
