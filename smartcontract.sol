pragma solidity ^0.4.0
contract Inheritance {

        address owner;
        bool deceased;
        uint money;

        constructor() public payable{
                owner=msg.sender;
                money=msg.value;
                deceased=false;
        }

        modifier oneOwner{
                require(msg.sender ==owner);//to maker sure sender is present
                _; //end modifier
                }
        modifier isDeceased {
                require (deceased==true);
                _;
        }
        address[] wallets;

        mapping(address=>uint) inheritance;

        function setup(address _wallet, uint _inheritance) public oneOwnder{
                wallets.push(_wallet);
                inheritance[_wallet] =_inheritance;
        }

        function moneyPaid() private isDeceased{
                for (uint i=0l 1<wallets.length; i++){
                        wallets[i].transfer(inheritance[wallets[i]]);
                }
        }
        function isDied() public oneOwnder{
                deceased =true;
                moneyPaid();
        }

}