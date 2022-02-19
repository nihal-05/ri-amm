import Web3 from "web3";
import { pairAddress, spenderAddress } from "./constants";
import { pairAbi } from "./contracts/pairAbi";
import { spenderAbi } from "./contracts/spenderAbi";

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

// ─── CONTRACT METHODS (start) ───────────────────────────────────────────────────────────

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

    return getEtherFromWei(myAmountA);
  } catch (error) {
    console.log("getQuote ", error);
  }
};
export const fetchReservesFromPairContract = async () => {
  try {
    const reserves = await pairContractInstance.methods.getReserves().call();
    return reserves;
  } catch (error) {
    console.log("fetchReservesFromPair", error);
  }
};

// ─── HELPERS (start) ────────────────────────────────────────────────────────────────────

export const getBalanceFromAccount = async (account: any) =>
  await web3.eth.getBalance(account[0]);

export const isValidAddress = async (account: string) =>
  await web3.utils.isAddress(account);

export const getBalanceInOtherUnit = async (balance: string, unit?: any) =>
  Number(await web3.utils.fromWei(balance, unit));

export const convertToWei = (number: any) => web3.utils.toWei(number);

// can be changed to other units by passing second parameter (defaults to ether)
export const getEtherFromWei = (amountInWei: string) =>
  web3.utils.fromWei(amountInWei);

export const convertToBN = (amount: string) => web3.utils.toBN(amount);
