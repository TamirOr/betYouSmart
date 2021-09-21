//SPDX-License-Identifier: MIT

pragma solidity 0.8.1;

import "./BetManager.sol";

contract Bet {
    uint public paidWei;
    string public index;
    uint public playerIndex;
    uint public creatorBudget;
    uint public gameDate;
    uint public creatorChoice;
    uint public playersBudget;
    address payable public creatorAddress;
    uint public ratio;

    struct S_Player {
        uint _playerBetAmount;
        address payable _playerAddress;
    }

    mapping(uint => S_Player) public players;

    BetManager parentContract;

    event BetSpread(uint _amount, address _address);
    event playerPayment(uint _amou, address _addr);

    constructor(BetManager _parentContract, address payable _creatorAddress, uint _creatorBudget, string memory _index, uint _ratio,
        uint _gameDate, uint _creatorChoice, uint _playersBudget) {

        index = _index;
        creatorBudget = _creatorBudget;
        ratio = _ratio;
        gameDate = _gameDate;
        creatorChoice = _creatorChoice;
        playersBudget = _playersBudget;
        parentContract = _parentContract;
        creatorAddress = _creatorAddress;

    }

    function finishContract(uint _choice) public {
        if (creatorChoice == _choice || playerIndex == 0) {
            uint amount = address(this).balance;
            creatorAddress.transfer(address(this).balance);
            emit BetSpread(amount, creatorAddress);
        }
        else {
            for (uint i = 0; i < playerIndex; i++) {
                uint playerWinAmount = players[i]._playerBetAmount;
                playerWinAmount = playerWinAmount * 100;
                playerWinAmount = playerWinAmount * ratio;
                playerWinAmount = playerWinAmount / 100;
                playerWinAmount = playerWinAmount / 100;
                address payable playerAddress = players[i]._playerAddress;
                playerAddress.transfer(playerWinAmount);
                emit BetSpread(playerWinAmount, playerAddress);
            }
            if (address(this).balance != 0) {
                uint creatorRefund = address(this).balance;
                creatorAddress.transfer(address(this).balance);
                emit BetSpread(creatorRefund, creatorAddress);
            }
        }
    }


    receive() external payable {
        if (paidWei == 0) {
            require(msg.sender == creatorAddress, "only creator of contract can fund it");
            require(msg.value == creatorBudget, "the value of the transaction must be equal to budget");
            (bool success,) = address(parentContract).call(abi.encodeWithSignature("triggerCreatorPayment(uint256)", index));
            require(success, "funding of the contract didnt succeed");
            paidWei += msg.value;
        }
        else {
            require(msg.value <= playersBudget, "You sent more funds than available budget");
            (bool success,) = address(parentContract).call(abi.encodeWithSignature("triggerPlayerPayment(uint256)", index));
            require(success, "Player payment didn't accept");
            playersBudget -= msg.value;
            players[playerIndex]._playerBetAmount = msg.value;
            players[playerIndex]._playerAddress = payable(msg.sender);
            emit playerPayment(players[playerIndex]._playerBetAmount, players[playerIndex]._playerAddress);
            playerIndex++;
        }


    }

    fallback() external {

    }

}
