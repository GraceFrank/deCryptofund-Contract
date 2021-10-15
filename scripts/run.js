const hre = require("hardhat");

async function main() {
  const [owner, randomPerson] = await hre.ethers.getSigners();

  const DeCryptoFund = await hre.ethers.getContractFactory("DeCryptoFund");
  const deCryptoFund = await DeCryptoFund.deploy();

  await deCryptoFund.deployed();

  console.log("DeCryptoFund deployed to:", deCryptoFund.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
