import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import web3 from 'web3';
import Stakingabi from 'Staking.json';

const App = () => {
  const [Currentaccount, setCurrentaccount] = useState("");
 
  const loadWeb3 = async () => {

    if(window.ethereum){
      window.web3 = new web3(window.ethereum);
      await window.ethereum.enable();
    } else if(window.web3){
      window.web3 = new web3(window.web3.currentProvider);
    } else{
      window.alert("Non-ethereum browser detected. You should consider trying MetaMask");
    }
  };

 const LoadBlockchaindata = async () => {
    setloader(true);
    const web3 = window.web3;

    // const accounts = await web3.eth.getAccounts();
    // const account = accounts[0];
    const account = "0xdb6805093478b927a0EE70A5Ad6A93Db751665FF";
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();

    const networkData = Stakingabi.networks[networkId];

    if (networkData) {
      const staking = new web3.eth.Contract(
        Stakingabi.abi,
        networkData.address
      );
    } else {
      window.alert("the smart contract is not deployed current network");
    }
  };
 
 
  return (    
    <>
      <div className="container-fluid navigate">
    <div className="row">
      <div className="col-md-10 col-12 mx-auto">
        <nav className="navbar navbar-expand-lg p-2">
          <div className="logo">
            <a href="#" className="navbar-brand"><span>StackingFlow</span></a>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navid">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse nav-pills text-center" id="navid">
            <ul className="navbar-nav ml-auto menu">
              <li className="nav-item">
                <a className="nav-link menu-btn" to="#home">Current Address</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>

<div className="main_box">
<div className="box">
<form>
<h2 style={{color:"#ff6b81"}}>For StakeHolder</h2>
<br/>
Add StakeHolder: <input type="text" className="form-control"/> <button className="btn btn-danger" style={{marginTop:"10px"}}>Add</button><br/>
Remove StakeHolder: <input type="text" className="form-control" /> <button className="btn btn-danger" style={{marginTop:"10px"}}>Remove</button>
</form>
</div>
</div>

    </>
  )
}

export default App;
