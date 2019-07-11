const fs = require('fs');

const MyToken = artifacts.require('MyToken');

module.exports = function(deployer) {
  deployer.deploy(MyToken).then((detail) => {
    address = '{' + '"address":' + '"' + detail.constructor.address + '"' + '}';
    fs.writeFile('./client/src/ERC20_Contract_address.json', address, 'utf8', (err) => {
      console.log(detail.constructor.address);
    });
  });
};
