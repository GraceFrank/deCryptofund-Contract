const main = async () => {
  const deCryptoFundContractFactory = await hre.ethers.getContractFactory(
    "DeCryptoFund"
  );
  const deCryptoFundContract = await deCryptoFundContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await deCryptoFundContract.deployed();
  console.log("Contract addy:", deCryptoFundContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    deCryptoFundContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  /*
   * Let's try two funding now
   */
  const fundTnx = await deCryptoFundContract.fund("This is funding #1");
  await fundTnx.wait();

  const fundTnx2 = await deCryptoFundContract.fund("This is funding #2");
  await fundTnx2.wait();

  contractBalance = await hre.ethers.provider.getBalance(deCryptoFundContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allFunding = await deCryptoFundContract.getAllFundings();
  console.log(allFunding);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
