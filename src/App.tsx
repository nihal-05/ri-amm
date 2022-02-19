import React, { useEffect, useState } from "react";

import "./App.css";
import { token0Address } from "./blockchain/constants";
import * as walletService from "./blockchain/wallet";

function App() {
  const [reserves, setReserves] = useState({});

  // ─── FORM STATE ─────────────────────────────────────────────────────────────────

  const [formToken0Value, setFormToken0Value] = useState<any>("");
  const [formToken1Value, setFormToken1Value] = useState<any>("");

  // ─── FETCHED STATE ──────────────────────────────────────────────────────────────

  // const [fetchedToken0Value, setFetchedToken0Value] = useState<any>("");
  // const [fetchedToken1Value, setFetchedToken1Value] = useState<any>("");




  // const [token0Value, setToken0Value] = useState<any>("");
  // const [token1Value, setToken1Value] = useState<any>("");

  // ─── OLD STATE ──────────────────────────────────────────────────────────────────

  const [myAccount, setMyAccount] = useState({
    account: "",
    balance: "",
  });

  const initialiazeWallet = async () => {
    const accounts = await walletService.getAllAccounts();
    const balanceInWei = await walletService.getBalanceFromAccount(accounts);
    const balanceInEther = await walletService.getBalanceInOtherUnit(
      balanceInWei
    );

    setMyAccount({
      account: (accounts as any)[0],
      balance: `${balanceInEther} ETH`,
    });
  };


  // ─── EVENT HANDLERS ───────────────────────────────────────────────────────────────────


  const handleFormSubmit = (e: any) => {
    e.preventDefault();
  };
  const handleToken0Change = (e: any) => {
    console.log("Input 1 :", e.target.value);

    setFormToken0Value(e.target.value)
  };
  const handleToken1Change = (e: any) => {
    console.log("Input 2  :", e.target.value);
    setFormToken1Value(e.target.value)
  };


  useEffect(() => {
    (async () => {
      const reservesFrom =
        await await walletService.fetchReservesFromPairContract();
      setReserves(reservesFrom);
    })();
  }, []);


  const getFetchedToken1Value = async (formtokenValue0: any) => {
    const token1Value =
      await await walletService.getQuoteFromSpenderContract(
        formtokenValue0,
        // @ts-ignore
        reserves[0],
        // @ts-ignore
        reserves[1]
      );
    setFormToken1Value(token1Value);
  }

  return (
    <div>
      <button className="btn" onClick={initialiazeWallet}>
        Connect Wallet
      </button>

      {/* Form */}

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="BUSD">BUSD</label>
        <input
          id="BUSD"
          type="number"
          onChange={(e) => { getFetchedToken1Value(e.target.value); setFormToken0Value(e.target.value) }}
          value={formToken0Value}
          min={0}


        />{" "}
        <br /> <br />
        <label htmlFor="BUST">BUST</label>
        <input
          id="BUST"
          type="number"
          min={0}

          value={formToken1Value}
          onChange={handleToken1Change}
        />{" "}
        <br /> <br />
        <button type="submit">Add liquidity</button>
      </form>
    </div>
  );
}

export default App;
