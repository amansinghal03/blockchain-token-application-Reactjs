// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StandaredERC20 is ERC20, ERC20Burnable, ERC20Pausable, Ownable {
    bool isMintable;
    bool isPausable;
    bool isBurnable;
    bool isBlackList;
    uint8 decimal;
    mapping(address => bool) public isUserBlackList;

    constructor(
        address initialOwner,
        string memory _name,
        string memory _symbol,
        uint8 _decimal,
        uint256 _totalSupply,
        address _service,
        bool _isMintable,
        bool _isPausable,
        bool _isBurnable,
        bool _isBlackList
    ) ERC20(_name, _symbol) payable Ownable(initialOwner) {
        decimal = _decimal;
        _mint(msg.sender, _totalSupply * 10 ** decimals());

        isMintable = _isMintable;
        isPausable = _isPausable;
        isBurnable = _isBurnable;
        isBlackList = _isBlackList;
        payable(_service).transfer(msg.value);
    }

    function decimals() public view virtual override(ERC20) returns (uint8) {
        return decimal;
    }

    function pause() public onlyOwner {
        require(isPausable, "Not Allowed");
        _pause();
    }

    function unpause() public onlyOwner {
        require(isPausable, "Not Allowed");
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(isMintable, "Not Allowed");
        _mint(to, amount);
    }

    function burn(uint256 value) public virtual override(ERC20Burnable) {
        require(isBurnable, "Not Allowed");
        super.burn(value);
    }

    function burnFrom(address account, uint256 value) public virtual override(ERC20Burnable) {
        require(isBurnable, "Not Allowed");
        super.burnFrom(account, value);
    }

    function updateBlackListUser(address _user, bool _status) public onlyOwner {
        require(isBlackList, "Not Allowed");
        require(isUserBlackList[_user] != _status, "Already Same Status");
        isUserBlackList[_user] = _status;
    }

    // The following functions are overrides required by Solidity.
    function _update(
        address from,
        address to,
        uint256 value
    ) internal whenNotPaused override(ERC20, ERC20Pausable) {
        require((isUserBlackList[from] == false && isUserBlackList[to] == false), "BlackListed");
        super._update(from, to, value);
    }
}