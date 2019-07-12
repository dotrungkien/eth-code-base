const fs = require('fs');

const MyERC721 = artifacts.require('MyERC721');

module.exports = function(deployer) {
  deployer.deploy(MyERC721).then((detail) => {
    address = '{' + '"address":' + '"' + detail.constructor.address + '"' + '}';
    fs.writeFile('./client/src/ERC721_Contract_address.json', address, 'utf8', (err) => {
      console.log(detail.constructor.address);
    });
  });
};
