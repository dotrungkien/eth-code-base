pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Metadata.sol';

contract MyERC721 is ERC721, ERC721Metadata {

  constructor() public ERC721Metadata("My ERC721 Token", "MyERC721") {}

  function mintUniqueTokenTo(address _to, uint256 _tokenId) external {
    super._mint(_to, _tokenId);
    super._setTokenURI(_tokenId, "My Token URI");
  }
}
