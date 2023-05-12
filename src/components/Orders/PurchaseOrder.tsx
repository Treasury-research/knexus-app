import React from "react";
import { knexusAddress } from "@/config";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

export default function PurchaseOrder({ children }: any) {
  const { config } = usePrepareContractWrite({
    address: knexusAddress,
    abi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
        ],
        name: "purchaseOrder",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "purchaseOrder",
  });

  const { write, data } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return <div onClick={write}>{children}</div>;
}
