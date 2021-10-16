// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract DeCryptoFund {
    uint256 fundingCount;
    uint256 private seed;

    event NewFunding(address indexed from, uint256 timestamp, string message);

    struct Funding {
        address funder;
        string message;
        uint256 timestamp;
    }

    Funding[] fundings;

    /*
     * This is an address => uint mapping, meaning I can associate an address with a number!
     * In this case, I'll be storing the address with the last time the user waved at us.
     */
    mapping(address => uint256) public lastFundedAt;

    constructor() payable {
        console.log("We have been constructed!");
    }

    function fund(string memory _message) public {
        /*
         * We need to make sure the current timestamp is at least 15-minutes bigger than the last timestamp we stored
         */
        require(
            lastFundedAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15m"
        );

        /*
         * Update the current timestamp we have for the user
         */
        lastFundedAt[msg.sender] = block.timestamp;

        fundingCount += 1;
        console.log("%s has funded you!", msg.sender);

        fundings.push(Funding(msg.sender, _message, block.timestamp));

        uint256 randomNumber = (block.difficulty + block.timestamp + seed) %
            100;
        console.log("Random # generated: %s", randomNumber);

        seed = randomNumber;

        if (randomNumber < 50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than they contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewFunding(msg.sender, block.timestamp, _message);
    }

    function getAllFundings() public view returns (Funding[] memory) {
        return fundings;
    }

    function getFundingCount() public view returns (uint256) {
        return fundingCount;
    }
}