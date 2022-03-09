import { UserRejectedRequestError } from "@web3-react/injected-connector";
// import { UserRejectedRequestError as walletConnectUserRejectedRequestError } from "@web3-react/walletconnect-connector";

import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");

export const getErrorMessage = (errorObj: any) => {
  let errorMessage;

  switch (true) {
    case errorObj instanceof UserRejectedRequestError:
      errorMessage = "You rejected the wallet request";
      break;
    // case errorObj instanceof walletConnectUserRejectedRequestError:
    //   errorMessage = "You rejected the wallet request";
    //   break;
    case errorObj.code === -32002:
      errorMessage =
        "A wallet request is already running. Please click on metamask extension and login.";
      break;

    default:
      errorMessage = "Something went wrong";
      break;
  }
  return errorMessage;
};

export const filterList = (arr: any[], criteria: any) => {
  if (criteria) return arr.filter((d) => d.name === criteria);
};

export const formatAccount = (acc: any) =>
  `${acc.slice(0, 6)}...${acc.slice(-4)}`;

export const getBalanceFromAccount = async (account: any) =>
  await web3.eth.getBalance(account);

export const getBalanceInOtherUnit = async (balance: any, unit = "ether") =>
  Number(await web3.utils.fromWei(balance, unit as any));

export const copyTextToClipboard = (txt: any) =>
  window.navigator.clipboard.writeText(txt);

interface Network {
  [key: number]: {
    tokenName: string;
    chainId: number;
    tokenSymbol: string;
    explorerUrl?: string;
  };
}

export const chainsMetadata: Network = {
  1: {
    tokenName: "Ethereum Mainnet",
    chainId: 1,
    tokenSymbol: "ETH",
    explorerUrl: "https://etherscan.io/address",
  },
  3: {
    tokenName: "Ropsten Testnet",
    chainId: 3,
    tokenSymbol: "ETH",
    explorerUrl: "https://ropsten.etherscan.io/address",
  },
  4: {
    tokenName: "Rinkeby Testnet",
    chainId: 4,
    tokenSymbol: "ETH",
    explorerUrl: "https://rinkeby.etherscan.io/address",
  },
  5: {
    tokenName: "Goerli Testnet",
    chainId: 5,
    tokenSymbol: "ETH",
    explorerUrl: "https://goerli.etherscan.io/address",
  },
  42: {
    tokenName: "Kovan Testnet",
    chainId: 42,
    tokenSymbol: "ETH",
    explorerUrl: "https://kovan.etherscan.io/address",
  },
  97: {
    tokenName: "Binance Smart Chain Testnet",
    chainId: 97,
    tokenSymbol: "BNB",
    explorerUrl: "https://testnet.bscscan.com/address",
  },
  5777: {
    tokenName: "Ganache",
    chainId: 5777,
    tokenSymbol: "GAN",
  },
};

export const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * (max - 0 + 1)) + 0;
};

export const networkMetaData = {
  chainId: "0x61",
  chainName: "Binance TestNet",
  nativeCurrency: {
    name: "Binance Chain Native Token",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
  blockExplorerUrls: ["https://testnet.bscscan.com/address"],
};
