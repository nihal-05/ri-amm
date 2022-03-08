import { useEffect } from "react";
import App from "../App";
import useChainId from "../shared/hooks/useChainId";
import ErrorPage from "./errorPage";
import { networkMetaData } from "./wallet/utils/helpers";

const RootApp = () => {
  const SUPPORTED_CHAINID = "0x61";
  const myChainId = useChainId();

  useEffect(() => {
    (async () => {
      if (SUPPORTED_CHAINID !== myChainId) {
        try {
          (window as any).ethereum &&
            (await (window as any).ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: SUPPORTED_CHAINID }],
            }));
        } catch (error) {
          console.log(error);

          if ((error as any).code === 4902) {
            try {
              await (window as any).ethereum.request({
                method: "wallet_addEthereumChain",
                params: [networkMetaData],
              });
            } catch (e) {
              console.log(e);
            }
          }
        }
      }
    })();
  }, []);

  return (
    <>
      {/* {SUPPORTED_CHAINID === myChainId ? (
        <App />
      ) : (
        <ErrorPage supportNetwork="Binance Smart Chain Testnet" />
      )} */}

      {/* {SUPPORTED_CHAINID === myChainId && <App />} */}

      <App />
    </>
  );
};

export default RootApp;
