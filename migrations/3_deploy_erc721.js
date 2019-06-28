const MyERC721 = artifacts.require('MyERC721');

module.exports = function(deployer) {
  deployer.deploy(MyERC721);
};
