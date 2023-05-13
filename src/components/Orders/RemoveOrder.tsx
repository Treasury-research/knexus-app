import React from "react";
import { knexusAddress } from "@/config";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

export default function RemoveOrder({ children, id, onSuccess }: any) {
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
        name: "removeOrder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "removeOrder",
    args: [id],
  });

  const { write, data } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess,
  });

  return (
    <div
      onClick={() => {
        write?.();
      }}
    >
      {children}
    </div>
  );
}
