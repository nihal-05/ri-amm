import { toast } from "react-toastify";
import Web3 from "web3";

import {
  pairAddress,
  spenderAddress,
  token0Address,
  token1Address,
} from "./constants";
import { pairAbi } from "./contracts/pairAbi";
import { spenderAbi } from "./contracts/spenderAbi";

import { token0Abi } from "./contracts/token0Abi";
import { token1Abi } from "./contracts/token1Abi";

const web3 = new Web3(Web3.givenProvider);

export const getAllAccounts = async () => {
  try {
    if ((window as any).ethereum) {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });

      return accounts;
    }
  } catch (error) {
    console.error("Error getting accounts", error);
  }
};

//
// ─── CONTRACTS INSTANCES ────────────────────────────────────────────────────────
//

const spenderContractInstance = new web3.eth.Contract(
  // @ts-ignore
  spenderAbi,
  spenderAddress
);
// @ts-ignore
const pairContractInstance = new web3.eth.Contract(pairAbi, pairAddress);
// @ts-ignore
const token0ContractInstance = new web3.eth.Contract(token0Abi, token0Address);
// @ts-ignore
const token1ContractInstance = new web3.eth.Contract(token1Abi, token1Address);

//
// ──────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: C O N T R A C T   M E T H O D S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────
//

export const fetchReservesFromPairContract = async () => {
  try {
    const reserves = await pairContractInstance.methods.getReserves().call();

    return reserves;
  } catch (error) {
    console.error("fetchReservesFromPair", error);
  }
};

export const getQuoteFromSpenderContract = async (
  amountA: any,
  reserveA: any,
  reserveB: any
) => {
  try {
    if (amountA > 0) {
      const myAmountA = await spenderContractInstance.methods
        .quote(convertToWei(amountA), reserveA, reserveB)
        .call();

      return myAmountA;
    } else {
      return;
    }
  } catch (error) {
    console.error("getQuote ", error);
  }
};

//
// ─── FETCHING BALANCES ──────────────────────────────────────────────────────────
//

export const fetchToken0Balance = async (userAddress: string) => {
  try {
    let balance = await token0ContractInstance.methods
      .balanceOf(userAddress)
      .call();

    return getEtherFromWei(balance.toString());
  } catch (error) {
    console.error("fetchToken0Balance", error);
  }
};
export const fetchToken1Balance = async (userAddress: string) => {
  try {
    let balance = await token1ContractInstance.methods
      .balanceOf(userAddress)
      .call();

    return getEtherFromWei(balance.toString());
  } catch (error) {
    console.error("fetchToken1Balance", error);
  }
};

export const getLpTokenBalance = async (address: string) => {
  try {
    const balance = await pairContractInstance.methods
      .balanceOf(address)
      .call();

    return balance;
  } catch (error) {
    console.error("getLpTokenBalance", error);
  }
};

//
// ─── GETTING APPROVED ───────────────────────────────────────────────────────────
//

export const getToken0Approve = async (amount0: string) => {
  // console.info("getToken0Approve  START");
  const accounts = await getAllAccounts();
  try {
    if (Number(amount0) > 0 && amount0 !== "") {
      let balance = await token0ContractInstance.methods
        .approve(spenderAddress, convertToWei(amount0))
        .send({ from: (accounts as any)[0] });
      // console.info("getToken0Approve  END");
      if (balance) {
        toast.success("BUSD token Approved");
      }
      return balance;
    } else {
      return;
    }
  } catch (error) {
    console.error("getToken0Approve", error);
    toast.error("BUSD token Approve Error");
  }
};
export const getToken1Approve = async (amount1: string) => {
  // console.log("getToken1Approve  START");
  const accounts = await getAllAccounts();

  try {
    if (Number(amount1) > 0 && amount1 !== "") {
      let balance = await token1ContractInstance.methods
        .approve(spenderAddress, convertToWei(amount1))
        .send({ from: (accounts as any)[0] });

      if (balance) {
        toast.success("BUST token Approved");
      }
      // console.info("getToken01Approve  END");
      return balance;
    } else {
      return;
    }
  } catch (error) {
    toast.error("BUST token Approve Error");
    console.error("getToken1Approve", error);
  }
};
export const getPairTokenApprove = async (amount1: any) => {
  // console.log("getPairTokenApprove START");

  const accounts = await getAllAccounts();
  try {
    let balance = await pairContractInstance.methods
      .approve(spenderAddress, convertToWei(amount1))
      .send({ from: (accounts as any)[0] });

    if (balance) {
      toast.success("Pair token Approved");
    }
    // console.log("getPairTokenApprove END");
    return balance;
  } catch (error) {
    toast.error("Pair token Error");
    console.error("getPairTokenApprove", error);
  }
};

//
// ─── ADD AND REMOVE LIQUIDITY ───────────────────────────────────────────────────
//

export const addLiquidityToThePool = async (
  amountADesired: any,
  amountBDesired: any,
  slippage: number,
  deadline: number
) => {
  // console.log("addLiquidityToThePool START");

  try {
    const accounts = await getAllAccounts();
    const amountADesiredInWei = convertToWei(
      Number(amountADesired).toFixed(8).toString()
    );
    const amountBDesiredInWei = convertToWei(
      Number(amountBDesired).toFixed(8).toString()
    );
    const amountAMinWei = convertToWei(
      (amountADesired - (slippage / 100) * amountADesired).toFixed(8).toString()
    );
    const amountBMinWei = convertToWei(
      (amountBDesired - (slippage / 100) * amountBDesired).toFixed(8).toString()
    );
    const myDeadLine = (getCurrentTimestamp() + deadline * 60).toString();

    // console.log("addLiquidity ARGS", {
    //   token0Address,
    //   token1Address,
    //   amountADesiredInWei,
    //   amountBDesiredInWei,
    //   amountAMinWei,
    //   amountBMinWei,
    //   accounts,
    //   myDeadLine,
    // });

    const addLiquiditySuccess = await spenderContractInstance.methods
      .addLiquidity(
        token0Address,
        token1Address,
        amountADesiredInWei,
        amountBDesiredInWei,
        amountAMinWei,
        amountBMinWei,
        (accounts as any)[0],
        myDeadLine
      )
      .send({ from: (accounts as any)[0] });

    if (addLiquiditySuccess) {
      toast.success("Token added successfully");
    }

    return addLiquiditySuccess;
    // console.log("addLiquidityToThePool END");
  } catch (error) {
    console.error("addLiquidityToThePool", error);
    toast.error("AddLiquidity Error");
  }
};

export const removeLiquidityFromThePool = async (
  lpBalance: any,
  amountADesired: any,
  amountBDesired: any,
  slippage: number,
  deadline: number
) => {
  // console.log("removeLiquidityFromThePool START");
  try {
    const accounts = await getAllAccounts();
    const amountAMinWei = (
      amountADesired -
      (slippage / 100) * amountADesired
    ).toString();
    const amountBMinWei = (
      amountBDesired -
      (slippage / 100) * amountBDesired
    ).toString();
    const myDeadLine = getCurrentTimestamp() + deadline * 60;

    // console.log("removeLiquidity ARGS", {
    //   token0Address,
    //   token1Address,
    //   lpBalance,
    //   amountAMinWei,
    //   amountBMinWei,
    //   accounts: accounts,
    //   myDeadLine,
    // });

    const removeLiquiditySuccess = await spenderContractInstance.methods
      .removeLiquidity(
        token0Address,
        token1Address,
        lpBalance.toString(),
        amountAMinWei,
        amountBMinWei,
        (accounts as any)[0],
        myDeadLine
      )
      .send({ from: (accounts as any)[0] });
    // console.log("removeLiquidityFromThePool END");

    if (removeLiquiditySuccess) {
      toast.success("Token removed successfully");
    }

    return removeLiquiditySuccess;
  } catch (error) {
    console.error("removeLiquidityFromThePool", error);
    toast.error("RemoveLiquidity Error");
  }
};

//
// ─── POOL TOKEN METHODS ───────────────────────────────────────────────────────
//

export const getPoolTokenBalances = async (
  reserve0: any,
  reserve1: any,
  lpBalance: any
) => {
  // console.log("getPoolTokenBalances START");
  try {
    const totalSupply = await pairContractInstance.methods.totalSupply().call();
    const busdBalance = (reserve0 / totalSupply) * lpBalance;
    const bustBalance = (reserve1 / totalSupply) * lpBalance;
    // console.log("getPoolTokenBalances END");
    return { busdBalance, bustBalance };
  } catch (error) {
    console.error("getPoolTokenBalance", error);
  }
};

//
// ─── SWAP TOKEN METHODS ───────────────────────────────────────────────────────
//

export const getAmountsOutFromSC = async (amountIn: any) => {
  // amountIn is in Ether (convert to wei)

  // const myAmount = (amountIn * 8.83074).toString(); // Will be changed in the future

  // console.log("getAmountsOutFromSC START");

  const amountInWei = convertToWei(amountIn); //  CHANGE THIS...
  try {
    const amountOut = await spenderContractInstance.methods
      .getAmountsOut(amountInWei, [token0Address, token1Address])
      .call();

    // console.log("getAmountsOutFromSC END");
    return getEtherFromWei(amountOut[1]);
  } catch (error) {
    console.error("getAmountsOutFromSC", error);
  }

  return;
};

export const getAmountsInFromSC = async (amountIn: any) => {
  // amountIn is in Ether (convert to wei)

  // const myAmount = (amountIn * 8.83074).toString(); // Will be changed in the future

  // console.log("getAmountsInFromSC START");

  const amountInWei = convertToWei(amountIn); //  CHANGE THIS...
  try {
    const myAmountIn = await spenderContractInstance.methods
      .getAmountsIn(amountInWei, [token0Address, token1Address])
      .call();

    // console.log("getAmountsInFromSC END");
    return getEtherFromWei(myAmountIn[0]);
  } catch (error) {
    console.error("getAmountsInFromSC", error);
  }

  return;
};

export const callSwapExactTokenForTokens = async (
  amountIn: any,
  amountOut: any,
  slippage: number,
  deadline: number
) => {
  try {
    // console.log("callSwapExactTokenForTokens START");

    const accounts = await getAllAccounts();
    const amountInWei = convertToWei(amountIn.toString());
    const amountOutMin = convertToWei(
      (amountOut - (slippage / 100) * amountOut).toFixed(8).toString()
    );
    const myDeadLine = (getCurrentTimestamp() + deadline * 60).toString();

    // console.log("callSwapExactTokenForTokens ARGS", {
    //   amountInWei,
    //   amountOutMin,
    //   path: [token0Address, token1Address],
    //   accounts: accounts,
    //   myDeadLine,
    // });

    const swapExactTokenForTokensSuccess = await spenderContractInstance.methods
      .swapExactTokensForTokens(
        amountInWei,
        amountOutMin,
        [token0Address, token1Address],
        (accounts as any)[0],
        myDeadLine
      )
      .send({ from: (accounts as any)[0] });
    // console.log("callSwapExactTokenForTokens END");

    if (swapExactTokenForTokensSuccess) {
      toast.success("Swap BUSD Success");
    }
    return swapExactTokenForTokensSuccess;
  } catch (error) {
    toast.error("Swap 0 Error");
    console.error("callSwapExactTokenForTokens", error);
  }
};

export const callSwapTokensForExactTokens = async (
  amountOut: any,
  amountIn: any,
  deadline: any
) => {
  try {
    // console.log("callSwapTokensForExactTokens START");
    const accounts = await getAllAccounts();
    const amountOutWei = convertToWei(amountOut.toString());
    const amountInWei = convertToWei(amountIn.toString());

    const myDeadLine = (getCurrentTimestamp() + deadline * 60).toString();

    // console.log("callSwapTokensForExactTokens ARGS", {
    //   amountOutWei,
    //   amountInWei,
    //   path: [token0Address, token1Address],
    //   accounts: accounts,
    //   myDeadLine,
    // });
    const callSwapTokensForExactTokens = await spenderContractInstance.methods
      .swapTokensForExactTokens(
        amountOutWei,
        amountInWei,
        [token0Address, token1Address],
        (accounts as any)[0],
        myDeadLine
      )
      .send({ from: (accounts as any)[0] });
    // console.log("callSwapTokensForExactTokens END");
    if (callSwapTokensForExactTokens) {
      toast.success("Swap BUST Success");
    }
    return callSwapTokensForExactTokens;
  } catch (error) {
    toast.error("Swap 1 Error");
    console.error("callSwapTokensForExactTokens", error);
  }
};

//
// ─── HELPERS ────────────────────────────────────────────────────────────────────
//
export const formatAccount = (acc: any) =>
  `${acc.slice(0, 6)}...${acc.slice(-4)}`;

export const getBalanceFromAccount = async (account: any) =>
  await web3.eth.getBalance(account[0]);

export const isValidAddress = async (account: string) =>
  await web3.utils.isAddress(account);

export const getBalanceInOtherUnit = async (balance: string, unit?: any) =>
  Number(await web3.utils.fromWei(balance, unit));

export const convertToWei = (number: string) => {
  // console.log("convertToWei B", number);
  // console.log("convertToWei A", web3.utils.toWei(number, "ether"));
  return web3.utils.toWei(number, "ether");
};

// can be changed to other units by passing second parameter (defaults to ether)
export const getEtherFromWei = (amountInWei: any) => {
  // console.log("getEtherFromWei B", amountInWei);
  // console.log(
  //   "getEtherFromWei A",
  //   web3.utils.fromWei(String(amountInWei)).toString()
  // );
  return web3.utils.fromWei(String(amountInWei)).toString();
};

export const getCurrentTimestamp = () =>
  parseInt((new Date().getTime() / 1000).toFixed(0));

export const convertToPrecisedNumber = (number: any) =>
  Number(getEtherFromWei(number)).toFixed(6).toString();

export const getReducedPoolToken = (percentage: any, balance: any) => {
  const [lpBalanace, BUSDBalance, BUSTBalance] = Object.values(balance).map(
    (value: any) => Math.floor(Number(value) * (percentage / 100))
  );

  return {
    lpBalanace,
    BUSDBalance,
    BUSTBalance,
  };
};
