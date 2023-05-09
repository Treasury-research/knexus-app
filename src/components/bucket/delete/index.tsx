import { useState } from 'react';
import {
  DelBucketTx,
  getAccount,
  ISignature712,
  ZERO_PUBKEY,
} from '@bnb-chain/greenfield-chain-sdk';
import { GRPC_URL } from '@/config';
import { useAccount, useNetwork } from 'wagmi';
import { makeCosmsPubKey, recoverPk } from '@bnb-chain/greenfield-chain-sdk';

export const DeleteBucket = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [bucketName, setBucketName] = useState('');
  const [gasLimit, setGasLimit] = useState(0);
  const [signInfo, setSignInfo] = useState<ISignature712>({
    messageHash: Uint8Array.from([]),
    signature: '',
  });

  const delBucketTx = new DelBucketTx(GRPC_URL, String(chain?.id)!);
  const [gasPrice, setGasPrice] = useState('');

  return (
    <>
      <h4>Delete Bucket</h4>
      <div>
        bucket name:
        <input
          onChange={(e) => {
            setBucketName(e.target.value);
          }}
        />
        <br />
        <button
          onClick={async () => {
            if (!address) return;

            const { sequence } = await getAccount(GRPC_URL!, address!);

            const simulateBytes = delBucketTx.getSimulateBytes({
              bucketName,
              from: address,
            });

            const authInfoBytes = delBucketTx.getAuthInfoBytes({
              sequence: sequence + '',
              denom: 'BNB',
              gasLimit: 0,
              gasPrice: '0',
              pubKey: makeCosmsPubKey(ZERO_PUBKEY),
            });

            const simulateGas = await delBucketTx.simulateTx(simulateBytes, authInfoBytes);

            console.log(simulateGas);

            const gasPri = simulateGas.gasInfo?.minGasPrice.replaceAll('BNB', '');
            setGasPrice(gasPri!);

            setGasLimit(simulateGas.gasInfo?.gasUsed.toNumber() || 0);
          }}
        >
          0. simulate
        </button>
        <br />
        <button
          onClick={async () => {
            if (!address) return;

            const { sequence, accountNumber } = await getAccount(GRPC_URL!, address!);

            const sign = await delBucketTx.signTx({
              accountNumber: accountNumber + '',
              bucketName,
              from: address,
              sequence: sequence + '',
              gasLimit,
              gasPrice,
              denom: 'BNB',
            });

            console.log('delete bucket 712 sign', sign);
            setSignInfo(sign);
          }}
        >
          1. sign 712
        </button>
        <br />
        <button
          onClick={async () => {
            if (!address) return;

            const { sequence, accountNumber } = await getAccount(GRPC_URL, address);

            const pk = recoverPk({
              signature: signInfo.signature,
              messageHash: signInfo.messageHash,
            });
            const pubKey = makeCosmsPubKey(pk);

            const rawBytes = await delBucketTx.getRawTxInfo({
              accountNumber: accountNumber + '',
              bucketName,
              from: address,
              sequence: sequence + '',
              gasLimit,
              pubKey,
              sign: signInfo.signature,
              denom: 'BNB',
              gasPrice,
            });

            console.log('delete rawBytes', rawBytes);

            const txRes = await delBucketTx.broadcastTx(rawBytes.bytes);

            console.log(txRes);

            if (txRes.code === 0) {
              alert('delete bucket success');
            }
          }}
        >
          2. broadcast tx
        </button>
      </div>
    </>
  );
};
