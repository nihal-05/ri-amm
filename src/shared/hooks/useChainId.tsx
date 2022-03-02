import { useEffect, useState } from "react";

const useChainId = (): number => {
  const [chainId, setChainId] = useState<number>();

  useEffect(() => {
    try {
      (async () => {
        if ((window as any).ethereum) {
          const chainIdHex = await (window as any).ethereum.request({
            method: "eth_chainId",
          });
          const chainId = parseInt(chainIdHex, 16);

          (window as any).ethereum.on("chainChanged", (_chainId: any) => {
            (window as any).location.reload();
          });

          setChainId(chainId);
        } else {
          console.error("Please install metamask");
        }
      })();
    } catch (error) {
      console.error("Error getting ChainID");
    }
  }, []);

  return Number(chainId);
};

export default useChainId;
