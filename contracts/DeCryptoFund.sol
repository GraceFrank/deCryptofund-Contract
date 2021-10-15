pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract DeCryptoFund {
    uint256 totalFunding;

    constructor() {
        console.log("Yo yo, I am a contract am I am smart");
    }

    function wave() public {
        totalFunding += 1;
        console.log("%s has waved!", msg.sender);
    }

    function gettotalFunding() public view returns (uint256) {
        console.log("We have %d total waves!", totalFunding);
        return totalFunding;
    }
}