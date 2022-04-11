// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './Tether.sol';
import './RWD.sol';

contract DecentralBank {
  address public owner = msg.sender;
  string public name = "Decentral Bank";
  Tether public tether;
  RWD public rwd;

  address[] public stakers;

  //keep track of staking balances
  mapping (address => uint) public stakingBalance;
  mapping (address => bool) public hasStaked;
  mapping (address => bool) public isStaked;

  constructor(Tether _tether, RWD _rwd) {
    //for interaction with tether and rwd tokens
    tether = _tether;
    rwd = _rwd;
  }

  //staking function
  function depositTokens(uint _amount) public {
    //transfer tether token to this contract address for staking
    tether.transferFrom(msg.sender, address(this), _amount);

    //updating staking balance
    stakingBalance[msg.sender] += _amount;
  }
}
