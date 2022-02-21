import React, { useEffect, useState } from "react";

import "./App.css";
import * as walletService from "./blockchain/wallet";

function App() {
  const [reserves, setReserves] = useState({});
  const [slippage, setSlippage] = useState(0.5); // 0.5%
  const [deadline, setDeadline] = useState(15); // 15 minutes

  // ─── FORM STATE ─────────────────────────────────────────────────────────────────

  // Values are in ETHER
  const [formToken0Value, setFormToken0Value] = useState<any>("");
  const [formToken1Value, setFormToken1Value] = useState<any>("");

  // ─── FETCHED STATE ( Values are in WEI) ──────────────────────────────────────────────────────────────
  const [fetchedToken0Value, setFetchedToken0Value] = useState<any>("");
  const [fetchedToken1Value, setFetchedToken1Value] = useState<any>("");

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

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    const isToken0Allowed = await walletService.getToken0Allowance(
      formToken0Value
    );
    const isToken1Allowed = await walletService.getToken1Allowance(
      formToken1Value
    );

    if (isToken0Allowed && isToken1Allowed) {
      walletService.addLiquidityToThePool(
        formToken0Value,
        fetchedToken1Value,
        slippage,
        deadline
      );
    }
  };
  const handleToken0Change = (e: any) => {
    setFormToken0Value(e.target.value);
    getToken1Value(e.target.value);
  };
  const handleToken1Change = (e: any) => {
    setFormToken1Value(e.target.value);
    getToken0Value(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const reservesFrom = await walletService.fetchReservesFromPairContract();
      setReserves(reservesFrom);
    })();
  }, []);

  // ─── IMPLEMENTING CONTRACT METHODS ──────────────────────────────────────────────

  const getToken0Value = async (token1Value: string) => {
    const token0Value = await await walletService.getQuoteFromSpenderContract(
      token1Value,
      // @ts-ignore
      reserves[1],
      // @ts-ignore
      reserves[0]
    );
    setFormToken0Value(walletService.getEtherFromWei(token0Value));
    setFetchedToken0Value(token0Value);
  };
  const getToken1Value = async (token0Value: string) => {
    const token1Value = await await walletService.getQuoteFromSpenderContract(
      token0Value,
      // @ts-ignore
      reserves[0],
      // @ts-ignore
      reserves[1]
    );
    setFormToken1Value(walletService.getEtherFromWei(token1Value));
    setFetchedToken1Value(token1Value);
  };

  return (
    <div>
      <button className="btn" onClick={initialiazeWallet}>
        {myAccount.account !== "" ? "Connected" : "Connect Wallet"}
      </button>

      {/* Form */}

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="BUSD">BUSD</label>
        <input
          id="BUSD"
          type="text"
          onChange={handleToken0Change}
          value={formToken0Value}
          min={0}
        />{" "}
        <br /> <br />
        <label htmlFor="BUST">BUST</label>
        <input
          id="BUST"
          type="text"
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
