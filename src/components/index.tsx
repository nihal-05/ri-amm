import React from "react";
import App from "../App";
import useChainId from "../shared/hooks/useChainId";
import ErrorPage from "./errorPage";

const RootApp = () => {
  const SUPPORTED_CHAINID = 97;
  const myChainId = useChainId();
  return (
    <>
      {SUPPORTED_CHAINID === myChainId ? (
        <App />
      ) : (
        <ErrorPage supportNetwork="Binance Smart Chain Testnet" />
      )}
    </>
  );
};

export default RootApp;
