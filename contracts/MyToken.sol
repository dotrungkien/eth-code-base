pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol';

contract MyToken is ERC20, ERC20Detailed {

	uint8 public constant DECIMALS = 0;
 	uint256 public constant INITIAL_SUPPLY = 100000000;
    address public owner;

	constructor () public ERC20Detailed ( 'My Token', 'MTK', DECIMALS){
		_mint(msg.sender, INITIAL_SUPPLY);
        owner = msg.sender;
	}
}
