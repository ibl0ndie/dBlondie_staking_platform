pragma solidity 0.8.9;

contract Tether {
    string public name = 'mTether';
    string public symbol = 'MUSDT';
    uint256 public totalSupply = 1000000000000000000000000; //24 zeroes 1 million tokens cuz of decimal = 1 = 1*10^18
    uint8 public decimal = 18;

    event Transfer (
        address indexed _from,
        address indexed _to,
        uint _value
    );
    
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping (address => uint) public balanceOf;
    //for approval the transaction and investors can't do mistakes
    mapping (address => mapping (address => uint)) public allowance;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to,uint256 _value) public returns(bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender,_to,_value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns(bool success) {
        //cuz caller should approve
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender,_spender,_value);
        return true;
    }

    function transferFrom(address _from,address _to , uint256 _value) public returns(bool success) {
        require(balanceOf[_from] >= _value);
        require(allowance[msg.sender][_from] >= _value);
        balanceOf[_to] += _value;
        balanceOf[_from] -= _value;
        //
        allowance[msg.sender][_from] -= _value;
        emit Transfer(_from,_to,_value);
        return true;
    }

}