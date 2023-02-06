pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC1155/ERC1155.sol";

contract ERC1155TokenWithRoyalties is ERC1155 {
    // mapping of token IDs to royalty percentages
    mapping (uint256 => uint8) public royalties;

    // event to track royalty payments
    event RoyaltyPaid(address recipient, uint256 tokenId, uint256 royalty);

    function transferWithRoyalties(address recipient, uint256[] memory tokenIds, uint256[] memory values) public payable {
        require(msg.value > 0, "No ether sent with transferWithRoyalties");
        uint256 royaltyTotal = 0;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            uint256 value = values[i];
            uint8 royaltyPercent = royalties[tokenId];
            uint256 royaltyAmount = (value * royaltyPercent) / 100;
            royaltyTotal += royaltyAmount;
            // transfer the royalty to the contract owner
            msg.sender.transfer(royaltyAmount);
        }
        // track the royalty payment
        emit RoyaltyPaid(msg.sender, tokenIds, royaltyTotal);
        // transfer the tokens to the recipient
        _transfer(msg.sender, recipient, tokenIds, values);
    }

    function setRoyalty(uint256 tokenId, uint8 royaltyPercent) public {
        require(msg.sender == address(this), "Only contract owner can set royalties");
        royalties[tokenId] = royaltyPercent;
    }
}
