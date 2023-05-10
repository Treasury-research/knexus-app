import '@/styles/globals.css';
import '@/styles/style.css';
import type { AppProps } from 'next/app';
import { createClient, WagmiConfig } from 'wagmi';
import {
  metaMaskWalletConnector,
  provider,
  trustWalletConnector,
  webSocketProvider,
} from '@/config';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [metaMaskWalletConnector, trustWalletConnector],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <WagmiConfig client={wagmiClient}>
      { router.pathname === '/login' ? <div className="bgImg loginPageBg"></div> : null }
      <main>
        <Navbar/>
        <Component {...pageProps} />
      </main>
    </WagmiConfig>
  );
}
