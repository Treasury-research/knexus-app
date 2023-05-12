import React from "react";
import { knexusAddress } from "@/config";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

export default function CreateOrder({ children }: any) {
  const { config } = usePrepareContractWrite({
    address: knexusAddress,
    abi: [
      {
        inputs: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_dataId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_groupId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
        ],
        name: "createOrder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "createOrder",
  });

  const { write, data } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return <div onClick={write}>{children}</div>;
}
