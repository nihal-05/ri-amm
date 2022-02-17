import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");

export const getAllAccounts = async () => {
  try {
    return await web3.eth.requestAccounts();
  } catch (error) {
    console.log("Error getting accounts", error);
  }
};

export const getBalanceFromAccount = async (account: any) =>
  await web3.eth.getBalance(account[0]);

export const isValidAddress = async (account: string) =>
  await web3.utils.isAddress(account);

export const getBalanceInOtherUnit = async (balance: string, unit?: any) =>
  Number(await web3.utils.fromWei(balance, unit));
