import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";

import * as walletService from "./blockchain/wallet";
import Card from "./components/card";

import { CardHeading } from "./components/card/style";
import WalletButton from "./components/wallet";
import {
  SharedArrowSign,
  SharedBlock,
  SharedPlusSign,
} from "./shared/components";
import { Button } from "./shared/components/button";
import Input from "./shared/components/input";

import {
  SharedBox,
  SharedFeedbackButton,
  SharedStack,
} from "./shared/components/styled";
import useChainId from "./shared/hooks/useChainId";
import { AppWrapper } from "./theme";

const App = () => {
  const [reserves, setReserves] = useState({});
  const [isNormal, setIsNormal] = useState(true);

  // eslint-disable-next-line
  const [slippage, setSlippage] = useState(0.5); // 0.5%
  // eslint-disable-next-line
  const [deadline, setDeadline] = useState(15); // 15 minutes
  const [myAccount, setMyAccount] = useState("");
  const [loadingText, setLoadingText] = useState(""); // (UI)

  const [showSection, setShowSection] = useState(""); // showing Section  (UI)

  // ─── STATE FOR ADD LIQUIDITY SECTION ────────────────────────────────────────────────

  // Values are in ETHER
  const [formToken0Value, setFormToken0Value] = useState<any>("");
  const [formToken1Value, setFormToken1Value] = useState<any>("");

  // ─── USER TOKEN BALANCES ────────────────────────────────────────────────────────

  const [userToken0Balance, setUserToken0Balance] = useState<any>("");
  const [userToken1Balance, setUserToken1Balance] = useState<any>("");

  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);

  // ─── STATE FOR REMOVE LIQUIDITY SECTION ────────────────────────────────────────────────

  // Values are in Wei
  const [poolTokenBalances, setPoolTokenBalances] = useState({
    lpBalanace: 0,
    BUSDBalance: 0,
    BUSTBalance: 0,
  });

  // Values are  in Wei
  const [computedTokenBalances, setComputedTokenBalances] = useState({
    lpBalanace: 0,
    BUSDBalance: 0,
    BUSTBalance: 0,
  });
  const [removeLiqPercent, setRemoveLiqPercent] = useState<number>(0); // Remove liquidity percentange (UI)
  const [isFetchedBalance, setIsFetchedBalance] = useState(false); // (UI) passing computedTokenBalances

  const [myCall, setMyCall] = useState(""); // (UI)
  const [errorText, setErrorText] = useState(""); // (UI)

  const context = useWeb3React();

  const SUPPORTED_CHAINID = "0x61";
  const myChainId = useChainId();
  // ─── STATE FOR SWAP  SECTION ────────────────────────────────────────────────

  // ─── EVENT HANDLERS ───────────────────────────────────────────────────────────────────

  const initializeWallet = async () => {
    const accounts = await walletService.getAllAccounts();
    setMyAccount((accounts as any)[0]);
  };

  // ─── FORM LOGIC (start) ─────────────────────────────────────────────────────────────────

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSvgClick = () => {
    setIsNormal(!isNormal);
  };
  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    if (showSection === "add") {
      setLoadingText("Approving BUSD token...   ");
      const isToken0Allowed = await walletService.getToken0Approve(
        formToken0Value
      );
      setLoadingText("Approving BUST token...");
      const isToken1Allowed = await walletService.getToken1Approve(
        formToken1Value
      );

      //
      // ─── ADD LIQUIDITY ───────────────────────────────────────────────
      //

      if (isToken0Allowed && isToken1Allowed) {
        setLoadingText("Adding Liquidity...");
        const addLiquiditySuccess = await walletService.addLiquidityToThePool(
          formToken0Value,
          formToken1Value,
          slippage,
          deadline
        );

        if (addLiquiditySuccess !== undefined) {
          setLoadingText("");
          setFormToken0Value("");
          setFormToken1Value("");
        }
      }
    } else if (showSection === "swap") {
      //
      // ─── SWAP TOKENS ───────────────────────────────────────────────
      //
      setLoadingText("Approving BUSD token...");
      const busdApprove = await walletService.getToken0Approve(formToken0Value);
      setLoadingText("Approving BUST token...");
      const bustApprove = await walletService.getToken1Approve(formToken1Value);
      if (busdApprove && bustApprove) {
        if (myCall === "token0Change") {
          setLoadingText("Swapping BUSD to BUST...");
          const swapSuccess = await walletService.callSwapExactTokenForTokens(
            formToken0Value,
            formToken1Value,
            slippage,
            deadline
          );

          if (swapSuccess !== undefined) {
            setLoadingText("");
            setFormToken0Value("");
            setFormToken1Value("");
          }
        } else if (myCall === "token1Change") {
          setLoadingText("Swapping BUST to BUSD...");
          const swapSuccess = await walletService.callSwapTokensForExactTokens(
            formToken1Value,
            formToken0Value,
            deadline
          );
          if (swapSuccess !== undefined) {
            setLoadingText("");
            setFormToken0Value("");
            setFormToken1Value("");
          }
        }
      }
    }
  };

  if (context.active) {
    initializeWallet();
  }

  const handleToken0Change = async (e: any) => {
    let value = e.target.value;

    setFormToken0Value(value);
    if (value >= 0 && value.length !== 0 && showSection === "add") {
      // Logic for Add Liquidity goes here
      // console.log("IN ADD");

      getToken1Value(value);
    } else if (value >= 0 && value.length !== 0 && showSection === "swap") {
      setMyCall("token0Change");
      // Logic for Swapping Liquidity goes here
      const getAmountsOut = await walletService.getAmountsOutFromSC(value);
      // console.log("IN SWAP");
      setFormToken1Value(getAmountsOut);
    } else {
      setFormToken1Value("");
      setFormToken0Value("");
    }
  };

  const handleToken1Change = async (e: any) => {
    let value = e.target.value;
    setFormToken1Value(value);
    if (value >= 0 && value.length !== 0 && showSection === "add") {
      // console.log("IN Add");
      getToken0Value(value);
    } else if (value >= 0 && value.length !== 0 && showSection === "swap") {
      setMyCall("token1Change");
      // console.log("IN SWAP");
      // Logic for Swapping Liquidity goes here
      const getAmountsIn = await walletService.getAmountsInFromSC(value);

      setFormToken0Value(getAmountsIn);
    } else {
      setFormToken1Value("");
      setFormToken0Value("");
    }
  };

  const clearForm = () => {
    setFormToken1Value("");
    setFormToken0Value("");
  };

  // ─── FORM LOGIC (end) ───────────────────────────────────────────────────────────────────

  const handleSectionShow = (e: any) => {
    const buttonText = e.target.innerText;
    if (buttonText === "Remove") {
      setShowSection("remove");
    } else if (buttonText === "Add") {
      setShowSection("add");
    } else {
      setShowSection("swap");
    }

    setFormToken0Value("");
    setFormToken1Value("");
  };

  const handleRemoveLiquidityValue = async (e: any) => {
    setRemoveLiqPercent(e.target.dataset.value);
  };

  console.log(context.active);

  // ────────────────────────────────────────────────────────────── I ──────────
  //   :::::: U S E - E F F E C T S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    (async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        // handleMetamaskConnect();
        initializeWallet();
      }

      // getting reserves
      if (context.active) {
        const reservesFrom =
          await await walletService.fetchReservesFromPairContract();
        setReserves(reservesFrom);
      }
    })();

    if ((window as any).ethereum) {
      (window as any).ethereum.on("accountsChanged", (newAccounts: any) => {
        if (newAccounts.length > 0) {
          setMyAccount(newAccounts);
        } else {
        }
        window.location.reload();
      });
    }
    setShowSection("add");
  }, []);

  useEffect(() => {
    // ─── ADD WALLET CONNECTED LOGIC HERE  ──────────────────────    ──────────────────────
    // @ts-ignore

    if (myAccount !== "" && SUPPORTED_CHAINID === myChainId) {
      (async () => {
        console.log("Yesss");
        // USER TOKEN BALANCES

        const token0Balance =
          myAccount &&
          (await await walletService.fetchToken0Balance(myAccount));
        const token1Balance =
          myAccount &&
          (await await walletService.fetchToken1Balance(myAccount));
        if (token0Balance && token1Balance) {
          setUserToken0Balance(token0Balance);
          setUserToken1Balance(token1Balance);
        }

        // POOL TOKEN BALANCES

        const liquidityLP =
          myAccount && (await walletService.getLpTokenBalance(myAccount));
        setPoolTokenBalances({
          ...poolTokenBalances,
          lpBalanace: liquidityLP,
        });
      })();
    } else {
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingText, myAccount]);

  console.log(myAccount);

  useEffect(() => {
    if ((reserves as any)[0] && poolTokenBalances.lpBalanace) {
      (async () => {
        // @ts-ignore
        const { busdBalance, bustBalance } =
          await walletService.getPoolTokenBalances(
            (reserves as any)[0],
            (reserves as any)[1],
            poolTokenBalances.lpBalanace
          );

        setPoolTokenBalances({
          ...poolTokenBalances,
          BUSDBalance: busdBalance,
          BUSTBalance: bustBalance,
        });

        setIsFetchedBalance(true);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolTokenBalances.lpBalanace]);

  useEffect(() => {
    setComputedTokenBalances(
      walletService.getReducedPoolToken(removeLiqPercent, poolTokenBalances)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeLiqPercent]);

  // ─── USE-EFFECTS FOR UI LOGIC ───────────────────────────────────────────────────────────────

  useEffect(() => {
    if (formToken0Value && formToken1Value) {
      setIsAddButtonDisabled(false);
    }
  }, [formToken0Value, formToken1Value]);

  //
  // ──────────────────────────────────────────────────────────────────────────────────────────────────  ──────────
  //   :::::: I M P L E M E N T I N G   C O N T R A C T   M E T H O D S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  //

  const getToken0Value = async (token1Value: string) => {
    const token0Value = await await walletService.getQuoteFromSpenderContract(
      token1Value,
      // @ts-ignore
      reserves[1],
      // @ts-ignore
      reserves[0]
    );

    const token0ValueInEther = await walletService.getEtherFromWei(
      token0Value || "0"
    );
    setFormToken0Value(token0ValueInEther);
  };
  const getToken1Value = async (token0Value: string) => {
    const token1Value = await await walletService.getQuoteFromSpenderContract(
      token0Value,
      // @ts-ignore
      reserves[0],
      // @ts-ignore
      reserves[1]
    );

    const token1ValueInEther = await walletService.getEtherFromWei(
      token1Value || "0"
    );
    setFormToken1Value(token1ValueInEther);
  };

  const handleRemoveLiquidity = async (e: any) => {
    if (poolTokenBalances.lpBalanace !== 0) {
      setLoadingText("Approving Pair Token...");
      const isLPTokenRemoveAllowed = await walletService.getPairTokenApprove(
        poolTokenBalances?.lpBalanace
      );

      if (
        isLPTokenRemoveAllowed &&
        computedTokenBalances.BUSDBalance !== 0 &&
        computedTokenBalances.BUSTBalance !== 0
      ) {
        setLoadingText("Removing Liquidity...");
        const removeLiquiditySuccess =
          await walletService.removeLiquidityFromThePool(
            computedTokenBalances.lpBalanace,
            computedTokenBalances.BUSDBalance,
            computedTokenBalances.BUSTBalance,
            slippage,
            deadline
          );

        if (removeLiquiditySuccess) {
          setLoadingText("");
          setComputedTokenBalances({
            BUSDBalance: 0,
            BUSTBalance: 0,
            lpBalanace: 0,
          });

          setRemoveLiqPercent(0);
        }
      }
    }
  };

  //
  // ─── FOR THE UI SECTION ─────────────────────────────────────────────────────────────────
  //

  const Nav = (
    <Button onClick={initializeWallet} align="end" m="6px">
      {/* {myAccount !== ""
        ? walletService.formatAccount(myAccount)
        : "Connect Wallet"} */}
    </Button>
  );

  const buttonValues = [25, 50, 75, 100];
  const tokenBalancesInEther = [
    walletService.convertToPrecisedNumber(poolTokenBalances.lpBalanace),
    walletService.convertToPrecisedNumber(poolTokenBalances.BUSDBalance),
    walletService.convertToPrecisedNumber(poolTokenBalances.BUSTBalance),
  ];

  const tokenBalancesInEtherComputed = [
    walletService.convertToPrecisedNumber(computedTokenBalances.lpBalanace),
    walletService.convertToPrecisedNumber(computedTokenBalances.BUSDBalance),
    walletService.convertToPrecisedNumber(computedTokenBalances.BUSTBalance),
  ];

  //
  // ─── JSX RENDER STARTS HERE ─────────────────────────────────────────────────────
  //'

  return (
    <React.Fragment>
      <SharedBox direction="row" justify="end" style={{ margin: "0 0 10px 0" }}>
        {/* {Nav} */}
        <WalletButton />
      </SharedBox>

      <SharedFeedbackButton
        as="a"
        href="https://forms.gle/5piEZUJdCw9ZF5vE8"
        target="_blank"
      >
        Feedback
      </SharedFeedbackButton>
      <AppWrapper>
        <Card>
          <CardHeading>
            <Button onClick={handleSectionShow} m="5px" btnType="success">
              Add
            </Button>

            <Button onClick={handleSectionShow} btnType="error">
              Remove
            </Button>
            <Button onClick={handleSectionShow} m="5px" btnType="warning">
              Swap
            </Button>
          </CardHeading>

          {/* // ─── ADD LIQUIDITY UI             ─────────────────────────────────────────────────────────────── // */}

          {showSection === "add" && (
            <form
              onSubmit={handleFormSubmit}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                margin: "40px 0",
              }}
            >
              <Input
                tokenName="BUSD"
                tokenBalance={Number(userToken0Balance).toFixed(4) || ""}
                type="text"
                label="Input"
                onChange={handleToken0Change}
                value={formToken0Value}
                min={0}
                onClick={clearForm}
                cover
              />
              <SharedBox direction="row" justify="center">
                {SharedPlusSign}
              </SharedBox>
              <Input
                tokenName="BUST"
                tokenBalance={Number(userToken1Balance).toFixed(4) || ""}
                type="text"
                label="Input"
                min={0}
                onChange={handleToken1Change}
                value={formToken1Value}
                onClick={clearForm}
                cover
              />

              <Button
                align="center"
                cover
                disabled={isAddButtonDisabled || loadingText !== ""}
                btnType="success"
              >
                {loadingText === "" ? "Add liquidity" : loadingText}
              </Button>
            </form>
          )}

          {/* // ──         Remove LIQUIDITY UI             ─────────────────────────────────────────────────────────────── // */}

          {showSection === "remove" && (
            <>
              <SharedStack direction="row" justify="space-evenly">
                {buttonValues.map((value) => (
                  <Button
                    key={value}
                    data-value={value}
                    onClick={handleRemoveLiquidityValue}
                  >
                    {value === 100 ? "Max" : value + "%"}
                  </Button>
                ))}
              </SharedStack>

              <SharedBlock
                title="Pooled Tokens"
                color="#38a169"
                values={isFetchedBalance ? tokenBalancesInEther : []}
              />
              <SharedBlock
                title="Selected Tokens"
                color="#dc3545"
                values={
                  tokenBalancesInEtherComputed[0] !== "0.000000"
                    ? tokenBalancesInEtherComputed
                    : []
                }
              />

              <SharedBox direction="column" align="center">
                <p>Slippage tolerance: 0.5%</p>
                <p>Transaction deadline: 15 min</p>

                <br />

                <p>1 BUSD = 2.495727 BUST</p>
                <p>1 BUST = 0.400685 BUSD</p>
              </SharedBox>

              <Button
                align="center"
                onClick={handleRemoveLiquidity}
                cover
                disabled={
                  loadingText !== "" || computedTokenBalances.lpBalanace === 0
                    ? true
                    : false
                }
                btnType="error"
              >
                {loadingText === "" ? "Remove Liquidity" : loadingText}
              </Button>
            </>
          )}

          {/* // ─── SWAPPING UI             ─────────────────────────────────────────────────────────────── // */}

          {showSection === "swap" && (
            <form
              onSubmit={handleFormSubmit}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                margin: "40px 0",
              }}
            >
              <Input
                tokenName={isNormal ? "BUSD" : "BUST"}
                tokenBalance={
                  isNormal
                    ? Number(userToken0Balance).toFixed(4)
                    : Number(userToken1Balance).toFixed(4) || ""
                }
                type="text"
                onChange={handleToken0Change}
                value={formToken0Value}
                label="From"
                min={0}
                onClick={clearForm}
                cover
              />
              <SharedBox
                direction="row"
                justify="center"
                // onClick={handleSvgClick}
              >
                {SharedArrowSign}
              </SharedBox>

              <Input
                tokenName={isNormal ? "BUST" : "BUSD"}
                tokenBalance={
                  isNormal
                    ? Number(userToken0Balance).toFixed(4)
                    : Number(userToken1Balance).toFixed(4)
                }
                type="text"
                min={0}
                label="To"
                onChange={handleToken1Change}
                value={formToken1Value}
                onClick={clearForm}
                cover
              />
              <Button
                align="center"
                cover
                disabled={isAddButtonDisabled || loadingText !== ""}
                btnType="warning"
              >
                {loadingText === "" ? "Swap" : loadingText}
              </Button>
            </form>
          )}
        </Card>
      </AppWrapper>
    </React.Fragment>
  );
};

export default App;
