import React, { useState } from "react";
import logo from "./logo.svg";

import "./App.css";
import * as walletService from "./utils/wallet";

function App() {

  const [myAccount, setMyAccount] = useState({
    account:"",
    balance:""
  });
  const initialiazeWallet = async () => {
    const accounts = await walletService.getAllAccounts();
    const balanceInWei = await walletService.getBalanceFromAccount(accounts);
    const balanceInEther = await walletService.getBalanceInOtherUnit(balanceInWei);

    setMyAccount({account:(accounts as any)[0],balance:`${balanceInEther} ETH`})
    console.log(balanceInEther);
  };


  return (
    <div>
      <button className="btn" onClick={initialiazeWallet}>Connect Wallet</button>
      <h3>{myAccount.account!==""? `Hi, ${myAccount.account}`:""} </h3>

      <h3>{myAccount.balance!==""?`Your account balance is ${myAccount.balance}`:""}</h3>
    </div>
  );
}

export default App;
