//SPDX-License-Identifier: MIT

pragma solidity 0.8.1;


import "./Bet.sol";
import "./Ownable.sol";

contract BetManager is Ownable {

    struct S_Bet {
        Bet _bet;
        BetManager.BetSteps _step;
    }

    mapping(string => S_Bet) public bets;
    string index;

    enum BetSteps {Created, CreatorPaid, PlayersPaid, ContractFinished}

    event BetStep(string _Index, uint _step, address _address);

    // ratio came on base 100
    function createBet(address payable _creatorAddress, uint _creatorBudget, uint _ratio,
        uint _gameDate, uint _creatorChoice, uint _playersBudget,
        string memory _index) public {
        Bet bet = new Bet(this, _creatorAddress, _creatorBudget, _index, _ratio, _gameDate,
            _creatorChoice, _playersBudget);
        index = _index;
        bets[index]._bet = bet;
        bets[index]._step = BetSteps.Created;
        emit BetStep(index, uint(bets[index]._step), address(bet));
    }

    function getContractAddress(uint index) public {
        return address(bets[index]._bet);
    }


    function triggerCreatorPayment(string memory _index) public {
        Bet bet = bets[_index]._bet;
        emit BetStep(_index, uint(bets[_index]._step), address(bet));
        require(address(bet) == msg.sender, "Only bets are allowed to update themselves");
        require(bets[_index]._step == BetSteps.Created, "bet is already initiated");
        bets[_index]._step = BetSteps.CreatorPaid;
        emit BetStep(_index, uint(bets[_index]._step), address(bet));
    }

    function triggerPlayerPayment(string memory _index) public {
        Bet bet = bets[_index]._bet;
        uint time = block.timestamp;
        require(address(bet) == msg.sender, "Only bets are allowed to update themselves");
        require(bets[_index]._step == BetSteps.CreatorPaid || bets[_index]._step == BetSteps.PlayersPaid, "bet is not open");
        if (time > bet.gameDate()) {
            bets[_index]._step = BetSteps.ContractFinished;
            emit BetStep(_index, uint(bets[_index]._step), address(bet));
        }
        else {
            bets[_index]._step = BetSteps.PlayersPaid;
            emit BetStep(_index, uint(bets[_index]._step), address(bet));
        }
    }


    function triggerContractFinished(string memory _index, uint _choice) public {
        bets[_index]._step = BetSteps.ContractFinished;
        bets[_index]._bet.finishContract(_choice);
        emit BetStep(_index, uint(bets[_index]._step), address(bets[_index]._bet));
    }

    fallback() external {
    }

}