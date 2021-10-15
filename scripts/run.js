const hre = require("hardhat");

async function main() {
  //
  const [owner, randomPerson] = await hre.ethers.getSigners();

  const DeCryptoFundFactory = await hre.ethers.getContractFactory(
    "DeCryptoFund"
  );
  const deCryptoFundContract = await DeCryptoFundFactory.deploy();
  await deCryptoFundContract.deployed();

  console.log("Contract deployed to:", deCryptoFundContract.address);
  console.log("Contract deployed by:", owner.address);
  console.log("DeCryptoFund deployed to:", deCryptoFundContract.address);

  let fundCount = await deCryptoFundContract.getTotalFunding();
  const fundTnx = await deCryptoFundContract.fund();
  fundTnx.wait();

  fundCount = deCryptoFundContract.getTotalFunding();

  waveTxn = await deCryptoFundContract.connect(randomPerson).fund();
  await waveTxn.wait();

  waveCount = await deCryptoFundContract.getTotalFunding();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
