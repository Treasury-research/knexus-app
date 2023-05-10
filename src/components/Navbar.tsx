import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";

import Logo from "../../public/images/TF-final-logo-5.png";

function helperTitle(pathname: string): string | null {
	if (pathname == "/accountMonitor") return "Account";
	if (pathname == "/apiKey") return "API Key";
	return null;
}

export default function Navbar(props: any) {
	const router = useRouter();
	const title = helperTitle(router.pathname);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	return (
		<div
			className={`navBar fixed w-full top-0 shadow-lg shadow-[#000] h-[80px] 
			px-[30px] pt-[0px] text-white text-md flex flex-row justify-between 
			items-center z-10 ${props.className}`}
		>
			<div className="flex flex-row items-center">
				<Image
					src={Logo}
					alt=""
					height={40}
					className="cursor-pointer"
					onClick={() => router.push("/")}
				/>
				<div
					className="mx-5 relative py-3 cursor-pointer"
				>
					<Link href="/bucket">Bucket</Link>
				</div>
				{/* <div className="mx-3">Use Cases</div> */}
				<div className="mx-3">Publish</div>
				<div className="mx-3">Data Market</div>
			</div>
			{/* { // 显示钱包部分 } */}
			{router.pathname !== "/" && (
				<div className="flex flex-row items-center cursor-pointer">
					{title ? (
						<div className="bg-[rgba(255,255,255,0.1)] text-[rgba(180,180,180,1)] px-2 py-1 text-center">
							{title}
						</div>
					) : null}
					{/* <div className="mx-3 relative">
						{ address ? <MenuDropdown>
							<ConnectWallet />
						</MenuDropdown>
						: <ConnectWallet />
						}
					</div> */}
				</div>
			)}
		</div>
	);
}
