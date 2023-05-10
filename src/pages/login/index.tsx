import Head from "next/head";
import Image from "next/image";
import LeftBracket from "../../../public/images/Vector-Left-Bracket.svg";
import RightBracket from "../../../public/images/Vector-Right-Bracket.svg";
import FinalLogo2 from "../../../public/images/TF-final-logo-2.png";
import cwicon from "../../../public/images/cwicon.png";
import { useCallback, useState } from "react";

export default function Home() {

  const [connecting, setConnecting] = useState(false);

  // connect wallet
  const handleConnect = useCallback(
    () => {
      // do something
    },
    [],
  )
  
	return (
		<>
			<Head>
				<title>Login</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<div className="flex flex-row items-center mx-20">
				<div className={`text-3xl text-[#BBE7E6] font-jura flex-1`}>
					<h1 className="max-w-3xl p-5">
						Hello! I&apos;m Transformer, an event-driven Web3 data service
						platform.
					</h1>
				</div>

				<div className="flex-1 flex flex-row justify-between ">
					<Image src={LeftBracket} alt="" priority />
					<div className="flex flex-col justify-center items-center max-w-xl text-center">
						<Image src={FinalLogo2} alt="" className="w-36 my-2" />

						<div className="bg-[rgba(255,255,255,0.10)] p-1 my-2">
							<h2
								className={`font-excluded capitalize text-[#B4B4B4] text-3xl`}
							>
								Connect Your Wallet
							</h2>
						</div>

						<div
							className={`text-xl text-[rgba(187,231,230,0.6)] font-jura my-2`}
						>
							Connect with one of our available wallet providers or create a new
							one
						</div>

						<button
							className="text-[#fff] border border-[#B4B4B4] self-stretch p-3 px-5 flex justify-between items-center text-xl my-10"
							disabled={connecting}
							onClick={handleConnect}
						>
							Browser Wallet
							<Image src={cwicon} alt="" className="max-w-[40px]" />
						</button>
					</div>
					<Image src={RightBracket} alt="" />
				</div>
			</div>
		</>
	);
}