// eslint-disable-next-line no-undef
var BetManager = artifacts.require("./BetManager.sol");

module.exports = function (deployer) {
  deployer.deploy(BetManager);
};
