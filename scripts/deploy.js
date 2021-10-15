const main = async () => {
  const [owner] = await hre.ethers.getSigners();
  const accountBalance = await owner.getBalance();

  console.log("Deploying contracts with account: ", owner.address);
  console.log("Account balance: ", accountBalance.toString());

  const Token = await hre.ethers.getContractFactory("DeCryptoFund");
  const portal = await Token.deploy();
  await portal.deployed();

  console.log("DeCryptoFund address: ", portal.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
