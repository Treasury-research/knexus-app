import { GRPC_URL } from "@/config";
import { decodeFromHex } from "@/utils/encoding";
import {
  makeCosmsPubKey,
  recoverPk,
  ZERO_PUBKEY,
} from "@bnb-chain/greenfield-chain-sdk";
import { getGasFeeBySimulate } from "@/utils/simulate";
import {
  CreateObjectTx,
  getAccount,
  ISignature712,
} from "@bnb-chain/greenfield-chain-sdk";
import { ChangeEvent, useState } from "react";
import { useAccount, useNetwork } from "wagmi";
const crypto = require("crypto");

interface IApprovalCreateObject {
  type: string;
  value: {
    bucket_name: string;
    content_type: string;
    creator: string;
    expect_checksums: string[];
    visibility: number;
    object_name: string;
    payload_size: string;
    primary_sp_approval: {
      expired_height: string;
      sig: string;
    };
    expect_secondary_sp_addresses: string[];
    redundancy_type: number;
  };
}

export const CreateObject = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const createObjectTx = new CreateObjectTx(GRPC_URL!, String(chain?.id)!);
  const [signInfo, setSignInfo] = useState<ISignature712>({
    messageHash: Uint8Array.from([]),
    signature: "",
  });
  const [gasLimit, setGasLimit] = useState(0);
  const [textarea, setTextArea] = useState("");
  const [gasPrice, setGasPrice] = useState("");
  const [xGnfdSignedMsg, setXGnfdSignedMsg] =
    useState<IApprovalCreateObject | null>(null);

  const w = (e = "") => e.split("").map(b).join("");

  const b = (e = "") => e.charCodeAt(0).toString(16);

  // const C = 16777216;
  // const S = 4;
  // const R = 2;
  // const y = async (e, t = C, l = S, o = R) => {
  //   try {
  //     let r = await n.e(529).then(n.bind(n, 66387)),
  //       i = await r.default(),
  //       a = await i.getCheckSums(e, t, l, o),
  //       { contentLength: u, expectCheckSums: s } = a;
  //     return {
  //       contentLength: u,
  //       expectCheckSums: JSON.parse(s),
  //     };
  //   } catch (e) {
  //     throw Error(e);
  //   }
  // };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files);

      /*
      const j = {
        type: "storage/CreateObject",
        value: {
          creator: address,
          object_name: e.target.files[0].name,
          content_type: e.target.files[0].type,
          payload_size: e.target.files[0].size,
          bucket_name: "qerq5334121111",
          visibility: 1,
          charged_read_quota: "0",
          primary_sp_approval: {},
          expect_checksums: [
            "ypV6WHhuwSty5hi8vSycC7WI4RHpLFE0l288p0GjVOU=",
            "8jDwYyQnMUKwTSlG+KuGYhb4lf57QUJ2p9/YlpD8bk0=",
            "RYVj1czxfZsAnryKfVXd50cLKYttyRqPW9S2XokepzM=",
            "bpW7tkcr28CbfEU8mlOzJvzMrrkgBV2jUDUCTYp6tEo=",
            "sQO1ROoQkWzTajRfIiinGOZc2G0b9e+mxtkZEImYM8k=",
            "pLX698bqLoV4Ohg+3mBn2g26OTVbZPLBi3RMI8BpfFo=",
            "WWqH88pDxn+BCVlIPlkbO953TehOt11KOFmhCgQrqqY=",
          ],
          redundancy_type: 0,
          expect_secondary_sp_addresses: [
            "0x02Ad74D9B2349c2f0B1e9598aB018B3414dDe87A",
            "0x14361bB0E7f1A4d656588F08dC56836C9Feb2454",
            "0x169321fC04A12c16D0DaF30BBfD0c805D0223803",
            "0x216B1EA22422F930E4A157d6f38F7b12206c2A39",
            "0x33b22C9d21670f001fA430fe9f35239123978e79",
            "0xdc5dFFfa5Fc0Addf4A3c32F8DB6F39E1554ecbcf",
            "0xEE380501A7fAA03CadBDF981B865064F824bC3EC",
          ],
        },
      };

      */

      const j = {
        type: "storage/CreateObject",
        value: {
          creator: "0xD3420A3be0a1EFc0FBD13e87141c97B2C9AC9dD3",
          object_name: "test1.png",
          content_type: "image/png",
          payload_size: "4632",
          bucket_name: "qerq5334121111",
          visibility: 1,
          charged_read_quota: "0",
          primary_sp_approval: {},
          expect_checksums: [
            "ypV6WHhuwSty5hi8vSycC7WI4RHpLFE0l288p0GjVOU=",
            "8jDwYyQnMUKwTSlG+KuGYhb4lf57QUJ2p9/YlpD8bk0=",
            "RYVj1czxfZsAnryKfVXd50cLKYttyRqPW9S2XokepzM=",
            "bpW7tkcr28CbfEU8mlOzJvzMrrkgBV2jUDUCTYp6tEo=",
            "sQO1ROoQkWzTajRfIiinGOZc2G0b9e+mxtkZEImYM8k=",
            "pLX698bqLoV4Ohg+3mBn2g26OTVbZPLBi3RMI8BpfFo=",
            "WWqH88pDxn+BCVlIPlkbO953TehOt11KOFmhCgQrqqY=",
          ],
          redundancy_type: 0,
          expect_secondary_sp_addresses: [
            "0x02Ad74D9B2349c2f0B1e9598aB018B3414dDe87A",
            "0x14361bB0E7f1A4d656588F08dC56836C9Feb2454",
            "0x169321fC04A12c16D0DaF30BBfD0c805D0223803",
            "0x216B1EA22422F930E4A157d6f38F7b12206c2A39",
            "0x33b22C9d21670f001fA430fe9f35239123978e79",
            "0xdc5dFFfa5Fc0Addf4A3c32F8DB6F39E1554ecbcf",
            "0xEE380501A7fAA03CadBDF981B865064F824bC3EC",
          ],
        },
      };
      console.log("j", j);
      let g = w(JSON.stringify(j));

      console.log("g", g);

      const fileData = new Blob([e.target.files[0]]);

      const u = new Uint8Array(await fileData.arrayBuffer());
      console.log("fileData", fileData);
      console.log("u", u);

      // var data = new FormData();
      // data.append("file", e.target.files[0]);
      await fetch(
        "https://qerq5334121111.gnfd-testnet-sp-2.bnbchain.org/test1.png",
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            authorization:
              "authTypeV2 ECDSA-secp256k1, Signature=1234567812345678123456781234567812345678123456781234567812345678",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua":
              '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "x-gnfd-txn-hash":
              "88ebdce135aabdde757fd023276a4113404cecbbe938500dfd27d774564ce927",
          },
          referrer: "https://dcellar.io/",
          referrerPolicy: "origin-when-cross-origin",
          method: "PUT",
          mode: "cors",
          body: e.target.files[0],
        }
      );

      /*
      var reader = new FileReader();

      reader.onload = function () {
        const arrayBuffer = this.result;
        console.log(arrayBuffer);
        const u = new Uint8Array(this.result);
        // S = new Uint8Array(arrayBuffer);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
      */

      // console.log(reader);
    }
  };

  return (
    <div>
      <h4>Create Object</h4>
      <input type="file" onChange={handleFileChange} />
      <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
        <textarea
          value={textarea}
          rows={14}
          placeholder="signed msg from Storage SDK"
          onChange={(e) => {
            setTextArea(e.target.value);
            const storageSignedMsg = decodeFromHex(e.target.value);

            try {
              const json = JSON.parse(
                storageSignedMsg
              ) as IApprovalCreateObject;

              console.log("storageSignedMsg", json);
              setXGnfdSignedMsg(json);
            } catch (e) {
              setXGnfdSignedMsg(null);
            }
          }}
        ></textarea>
        <div> {"=>"} </div>
        <div>
          <textarea
            placeholder="decode signed msg"
            rows={14}
            cols={30}
            disabled
            value={JSON.stringify(xGnfdSignedMsg, null, 2)}
          ></textarea>
        </div>
      </div>

      <button
        onClick={async () => {
          if (!xGnfdSignedMsg || !address) return;

          const { sequence } = await getAccount(GRPC_URL!, address!);

          const simulateBytes = createObjectTx.getSimulateBytes({
            objectName: xGnfdSignedMsg.value.object_name,
            contentType: xGnfdSignedMsg.value.content_type,
            from: xGnfdSignedMsg.value.creator,
            bucketName: xGnfdSignedMsg.value.bucket_name,
            expiredHeight:
              xGnfdSignedMsg.value.primary_sp_approval.expired_height,
            sig: xGnfdSignedMsg.value.primary_sp_approval.sig,
            visibility: xGnfdSignedMsg.value.visibility,
            payloadSize: xGnfdSignedMsg.value.payload_size,
            expectChecksums: xGnfdSignedMsg.value.expect_checksums,
            redundancyType: xGnfdSignedMsg.value.redundancy_type,
            expectSecondarySpAddresses:
              xGnfdSignedMsg.value.expect_secondary_sp_addresses,
          });

          const authInfoBytes = createObjectTx.getAuthInfoBytes({
            sequence: sequence + "",
            denom: "BNB",
            gasLimit: 0,
            gasPrice: "0",
            pubKey: makeCosmsPubKey(ZERO_PUBKEY),
          });

          const simulateGas = await createObjectTx.simulateTx(
            simulateBytes,
            authInfoBytes
          );
          console.log("simulateGas", simulateGas);

          const gasPri = simulateGas.gasInfo?.minGasPrice.replaceAll("BNB", "");
          setGasPrice(gasPri!);

          console.log("gas fee", getGasFeeBySimulate(simulateGas));
          setGasLimit(simulateGas.gasInfo?.gasUsed.toNumber() || 0);
        }}
      >
        0. simulate
      </button>
      <br />
      <button
        onClick={async () => {
          if (!xGnfdSignedMsg) return;
          if (address !== xGnfdSignedMsg.value.creator) {
            alert("account is not creator");
          }

          const { sequence, accountNumber } = await getAccount(
            GRPC_URL!,
            address!
          );
          const sign = await createObjectTx.signTx({
            accountNumber: accountNumber + "",
            bucketName: xGnfdSignedMsg.value.bucket_name,
            contentType: xGnfdSignedMsg.value.content_type,
            denom: "BNB",
            expectChecksums: xGnfdSignedMsg.value.expect_checksums,
            expectSecondarySpAddresses:
              xGnfdSignedMsg.value.expect_secondary_sp_addresses,
            expiredHeight:
              xGnfdSignedMsg.value.primary_sp_approval.expired_height,
            from: xGnfdSignedMsg.value.creator,
            gasLimit,
            visibility: xGnfdSignedMsg.value.visibility,
            objectName: xGnfdSignedMsg.value.object_name,
            payloadSize: xGnfdSignedMsg.value.payload_size,
            redundancyType: xGnfdSignedMsg.value.redundancy_type,
            sequence: sequence + "",
            sig: xGnfdSignedMsg.value.primary_sp_approval.sig,
            gasPrice,
          });

          console.log("create object 712 sign", sign);
          setSignInfo(sign);
        }}
      >
        1. sign 712
      </button>
      <br />
      <button
        onClick={async () => {
          if (!address || !xGnfdSignedMsg) return;
          if (address !== xGnfdSignedMsg.value.creator) {
            alert("account is not creator");
          }

          const { sequence, accountNumber } = await getAccount(
            GRPC_URL,
            address
          );

          const pk = recoverPk({
            signature: signInfo.signature,
            messageHash: signInfo.messageHash,
          });
          const pubKey = makeCosmsPubKey(pk);

          const rawBytes = await createObjectTx.getRawTxInfo({
            bucketName: xGnfdSignedMsg.value.bucket_name,
            denom: "BNB",
            from: address,
            gasLimit,
            pubKey,
            sequence: sequence + "",
            accountNumber: accountNumber + "",
            sign: signInfo.signature,
            expiredHeight:
              xGnfdSignedMsg.value.primary_sp_approval.expired_height,
            sig: xGnfdSignedMsg.value.primary_sp_approval.sig,
            visibility: xGnfdSignedMsg.value.visibility,
            contentType: xGnfdSignedMsg.value.content_type,
            expectChecksums: xGnfdSignedMsg.value.expect_checksums,
            objectName: xGnfdSignedMsg.value.object_name,
            payloadSize: xGnfdSignedMsg.value.payload_size,
            redundancyType: xGnfdSignedMsg.value.redundancy_type,
            expectSecondarySpAddresses:
              xGnfdSignedMsg.value.expect_secondary_sp_addresses,
            gasPrice,
          });

          console.log("rawBytes", rawBytes);

          const txRes = await createObjectTx.broadcastTx(rawBytes.bytes);
          console.log("txRes", txRes);
          if (txRes.code === 0) {
            alert("success");
          }
        }}
      >
        2. broadcast tx
      </button>
    </div>
  );
};
