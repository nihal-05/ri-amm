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

const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");

export const getAllAccounts = async () => {
  try {
    return await web3.eth.requestAccounts();
  } catch (error) {
    console.log("Error getting accounts", error);
  }
};

// ─── CONTRACTS INSTANCES  (start) ──────────────────────────────────────────────────────────────────

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

// ─── CONTRACT METHODS (start) ───────────────────────────────────────────────────────────

export const fetchReservesFromPairContract = async () => {
  try {
    const reserves = await pairContractInstance.methods.getReserves().call();
    return reserves;
  } catch (error) {
    console.log("fetchReservesFromPair", error);
  }
};

export const getQuoteFromSpenderContract = async (
  amountA: any,
  reserveA: any,
  reserveB: any
) => {
  try {
    const myAmountA = await spenderContractInstance.methods
      .quote(
        convertToWei(amountA),
        convertToBN(reserveA),
        convertToBN(reserveB)
      )
      .call();

    return myAmountA;
  } catch (error) {
    console.log("getQuote ", error);
  }
};

// ─── FETCHING BALANCES  ──────────────────────────────────────────────────────────

export const fetchToken0Balance = async (userAddress: string) => {
  try {
    let balance = await token0ContractInstance.methods
      .balanceOf(userAddress)
      .call();

    return getEtherFromWei(balance);
  } catch (error) {
    console.log("fetchToken0Balance", error);
  }
};
export const fetchToken1Balance = async (userAddress: string) => {
  try {
    let balance = await token1ContractInstance.methods
      .balanceOf(userAddress)
      .call();

    return getEtherFromWei(balance);
  } catch (error) {
    console.log("fetchToken1Balance", error);
  }
};

// ─── GETTING ALLOWANCES ─────────────────────────────────────────────────────────

export const getToken0Allowance = async (amount0: string) => {
  const accounts = await getAllAccounts();
  try {
    let balance = await token0ContractInstance.methods
      .approve(spenderAddress, convertToWei(amount0))
      .send({ from: (accounts as any)[0] });

    return balance;
  } catch (error) {
    console.log("getToken0Allowance", error);
  }
};
export const getToken1Allowance = async (amount1: string) => {
  const accounts = await getAllAccounts();
  try {
    let balance = await token1ContractInstance.methods
      .approve(spenderAddress, convertToWei(amount1))
      .send({ from: (accounts as any)[0] });

    return balance;
  } catch (error) {
    console.log("getToken1Allowance", error);
  }
};

export const addLiquidityToThePool = async (
  amountADesired: any,
  amountBDesired: any,
  slippage: number,
  deadline: number
) => {
  const accounts = await getAllAccounts();
  let amountAMin = amountADesired - slippage * amountADesired;
  let amountBMin = amountBDesired - slippage * amountBDesired;

  try {
    await spenderContractInstance.methods
      .addLiquidity(
        token0Address,
        token1Address,
        convertToWei(amountADesired),
        convertToWei(amountBDesired),
        convertToWei(amountAMin.toString()),
        convertToWei(amountBMin.toString()),
        (accounts as any)[0],
        (getCurrentTimestamp() + deadline).toString()
      )

      .send({ from: (accounts as any)[0] });
    debugger;
  } catch (error) {
    console.log("addLiquidityToThePool", error);
  }
};

// ─── HELPERS (start) ────────────────────────────────────────────────────────────────────

export const getBalanceFromAccount = async (account: any) =>
  await web3.eth.getBalance(account[0]);

export const isValidAddress = async (account: string) =>
  await web3.utils.isAddress(account);

export const getBalanceInOtherUnit = async (balance: string, unit?: any) =>
  Number(await web3.utils.fromWei(balance, unit));

export const convertToWei = (number: string) => web3.utils.toWei(number);

// can be changed to other units by passing second parameter (defaults to ether)
export const getEtherFromWei = (amountInWei: any) =>
  web3.utils.fromWei(amountInWei);

export const convertToBN = (amount: string) => web3.utils.toBN(amount);

export const getCurrentTimestamp = () =>
  parseInt((new Date().getTime() / 1000).toFixed(0));

// ─── HELPERS (end)  ────────────────────────────────────────────────────────────────────
