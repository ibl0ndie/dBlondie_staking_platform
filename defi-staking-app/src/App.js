import React, { Component } from 'react';
import Navbar from './components/navbar';
import Web3 from 'web3';
import Tether from './truffle_abis/Tether.json';
import RWD from './truffle_abis/RWD.json';
import DecentralBank from './truffle_abis/DecentralBank.json';
import Main from './components/main';
import ParticleSetting from './components/particlesetting';
//import { ethers } from 'ethers';


class App extends Component {

    async UNSAFE_componentWillMount() { //calls before render
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    //load our web3
    async loadWeb3() {
        if(window.ethereum) { //if our window detect ethereum
            window.web3 = new Web3(window.ethereum) //then we create a instance of web3
            await window.eth_requestAccounts //and enable it
        } else if(window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('no ethereum detected! check out metamask!')
        }
    }

    //access to account
    async loadBlockchainData() {
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        this.setState({account : account[0]})
        console.log(account[0],'account')

        //set network file to 5777
        const networkId = await web3.eth.net.getId()
        console.log(networkId,'network id')

        //load tether contract and set to the state of tether
        //if we can get the network so we can bring in contract for the network
        const tetherData = Tether.networks[networkId] //tetherdata is gonna be networkid
        console.log(tetherData,'tetherData')
        if(tetherData) {
            const tether = new web3.eth.Contract(Tether.abi , tetherData.address)
            this.setState({tether}) //tether is the permenant info of the contract
            /*let tetherBalance = await tether.methods.balanceOf(this.state.account).call() // call cuz of methods
            this.setState({tetherBalance : tetherBalance.toString()})
            console.log(tetherBalance)*/
        } else {
            window.alert('Error! Tether contract was not deployed - no detected network!')
        }

        //loading RWD contract
        const rwdData = RWD.networks[networkId] //rwdData is gonna be networkid
        console.log(rwdData,'rwdData')
        if(rwdData) {
            const rwd = new web3.eth.Contract(RWD.abi , rwdData.address)
            this.setState({rwd}) //tether is the permenant info of the contract
            /*let rewardBalance = await rwd.methods.balanceOf(this.state.account).call() // call cuz of methods
            this.setState({rewardBalance : rewardBalance.toString()})
            console.log(rewardBalance)*/
        } else {
            window.alert('Error! rwd contract was not deployed - no detected network!')
        }

        //loading DecentralBank contract
        const decentralbankData = DecentralBank.networks[networkId] //decentralbankData is gonna be networkid
        console.log(decentralbankData,'decentralbankData')
        if(decentralbankData) {
            const decentralbank = new web3.eth.Contract(DecentralBank.abi , decentralbankData.address)
            this.setState({decentralbank}) //tether is the permenant info of the contract
            /*let stakingBalance = await decentralbank.methods.stakingBalance(this.state.account).call() // call cuz of methods
            this.setState({stakingBalance : stakingBalance.toString()})
            console.log(stakingBalance)*/
        } else {
            window.alert('Error! decentralbank contract was not deployed - no detected network!')
        }
        this.setState({loading : false})
    }

    constructor(props) {
        super(props);
        this.state = {
            account : '0x0',
            tether : {},
            rwd : {},
            decentralbank : {},
            tetherBalance : '0',
            rewardBalance : '0',
            stakingBalance : '0',
            loading : true,

        }
    }

    render() { 
        return (
            <div className='App' style={{position:'relative'}}>
                <div style={{position:'absolute'}}>
                    <ParticleSetting />
                </div>
                <Navbar account={this.state.account} />
                <div className='container-fluid mt-5'>
                    <div className='row'>
                        <main role='main' className='col-lg-12 ml-auto mr-auto' style={{maxWidth:'600px', minHeight:'600px'}}>
                            <div>
                                <Main />
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default App;