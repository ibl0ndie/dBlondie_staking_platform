const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function (deployer,network,accounts) {
  //deploy tether contract
  await deployer.deploy(Tether)
  const tether = await Tether.deployed()

  //deploy RWD contract
  await deployer.deploy(RWD)
  const rwd = await RWD.deployed()

  //deploy DecentralBank contract
  await deployer.deploy(DecentralBank , rwd.address , tether.address)
  const decentralbank = await DecentralBank.deployed()

  //move tokens to decentral bank
  await rwd.transfer(decentralbank.address,'1000000000000000000000000')

  //100 airdrop
  await tether.transfer(accounts[1],'100000000000000000000')
}
