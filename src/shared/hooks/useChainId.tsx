import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useChainId = (): any => {
  const [chainId, setChainId] = useState<any>();

  useEffect(() => {
    try {
      (async () => {
        if ((window as any).ethereum) {
          const chainIdHex = await (window as any).ethereum.request({
            method: "eth_chainId",
          });
          // const chainId = parseInt(chainIdHex, 16);  //     In decimal format

          (window as any).ethereum.on("chainChanged", (_chainId: any) => {
            (window as any).location.reload();
          });

          setChainId(chainIdHex);
        } else {
          // toast.error("Please install metamask extension");
          console.error("Please install metamask extension");
        }
      })();
    } catch (error) {
      console.error("Error getting ChainID");
    }
  }, []);

  return chainId;
};

export default useChainId;
