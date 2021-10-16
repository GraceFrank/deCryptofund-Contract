const main = async () => {
  const deCryptoFundContractFactory = await hre.ethers.getContractFactory(
    "DeCryptoFund"
  );
  const deCryptoFundContract = await deCryptoFundContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.001"),
  });

  await deCryptoFundContract.deployed();

  console.log("DeCryptoFund address: ", deCryptoFundContract.address);
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
