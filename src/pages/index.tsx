import { useIsMounted } from '@/hooks/useIsMounted';
import { Carousel, Tabs, TabsProps } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import nav1 from '../../public/images/intro/nav1.svg'
import nav2 from '../../public/images/intro/nav2.svg'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { AiOutlineTwitter, AiFillMediumCircle } from 'react-icons/ai'
import { BsDiscord } from 'react-icons/bs'
import { SiTelegram } from 'react-icons/si'
import mirror from '../../public/images/mirror.png'

export default function Home() {
  const isMounted = useIsMounted();
  const router = useRouter();

  // https://github.com/ethers-io/ethers.js/issues/726

  if (!isMounted) return null;

  const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <h3 className='text-[#BBE7E6] 2xl:text-4xl xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl font-bold'>Buyers</h3>,
      children: <ul className='2xl:text-3xl xl:text-2xl lg:text-2xl md:text-xl sm:text-base text-[#fff] list-disc ml-8' style={{lineHeight: 1.3}}>
        <li>Simply select the data you want and proceed to checkout with crypto, and the transaction will be automatically handled by our smart contract. It's that simple!</li>
        <li>The NFT shows the result of AI prompts, What you see from the NFTs is what you get with prompts!</li>
      </ul>,
    },
    {
      key: '2',
      label: <h3 className='text-[#BBE7E6] 2xl:text-4xl xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl font-bold'>Sellers</h3>,
      children: <ul className='2xl:text-3xl xl:text-2xl lg:text-2xl md:text-xl sm:text-base text-[#fff] list-disc ml-8' style={{lineHeight: 1.3}}>
        <li>I’m a data engineer:
          <ul className='list-disc ml-8'>
            <li>Generate data from trusted platforms such as Transformer or Dune (coming soon)</li>
            <li>Upload your data report to KNexus with just one click</li>
            <li>Price your data to receive the real value to your wallet!</li>
          </ul>
        </li>
        <li>I’m a prompt engineer:
          <ul className='list-disc ml-8'>
            <li>Submit your prompt to trusted AIGC platforms such as Midjourney through KNexus</li>
            <li>Generate content using the AIGC prompt</li>
            <li>Use the generated content and prompt to mint an NFT under the KNexus NFT protocol</li>
            <li>List your NFT on the KNexus platform to receive the real value directly to your wallet!</li>
          </ul>
        </li>
      </ul>,
    },
  ];

  return (
    <>
      <Head>
        <title>Construct Assignment</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ width: '80%', margin: '0 auto'}}>
        <div className='w-full'>
          <div className='2xl:h-[800px] sm:flex sm:justify-center 2xl:min-h-[600px] xl:min-h-[500px] lg:min-h-[400px] md:min-h-[300px] 2xl:items-center sm:items-stretch'>
            <div className='flex-1 items-stretch 2xl:mr-20 xl:mr-15 lg:mr-10 md:mr-5 sm:mr-2'>
              <h1 className='text-[#BBE7E6] 2xl:text-7xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-bold'>Turn your data into its real value.</h1>
              <p className='my-2 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-base w-10/12 2xl:my-8 xl:my-6 lg:my-4 md:my-3 font-bold'>Empower your Web3 journey with agile and intelligent services</p>
              <button className='bg-white text-[#000] md:py-2 md:px-4 sm:py-1 sm:px-3 font-bold lg:text-xl md:text-md sm:text-sm' onClick={() => router.push('/login')}>
                Get Started
              </button>
            </div>
            <div className='sm:w-5/12 flex-1 sm:my-0 my-10'>
              <Carousel autoplay>
                <div>
                  <Image src={nav1} alt='nav1' />
                </div>
                <div>
                  <Image src={nav2} alt='nav1' />
                </div>
              </Carousel>
            </div>
          </div>
          <section className='sm:mt-20 md:mt-0'>
            <h2 className='2xl:my-8 xl:py-6 lg:py-6 md:py-6 sm:py-1 text-[#BBE7E6] 2xl:text-7xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-bold'>How It works</h2>
            <p className='2xl:text-3xl xl:text-2xl lg:text-2xl md:text-xl sm:text-base' style={{lineHeight: 1.3}}>By leveraging web3 technology, KNexus is able to provide a decentralized and transparent platform for data monetization. Users can maintain control over their data and receive fair compensation for their contributions, while buyers can access high-quality data content whether on-chain data reports or AIGC prompts to enhance their own projects. Whether you're a creator or a buyer, KNexus offers a unique opportunity to participate in the exciting world of web3 data monetization.</p>
          </section>
          <section className='my-20'>
            <Tabs defaultActiveKey="1" items={items} />
          </section>
        </div>
        {/* <li>
          <Link href="/wallet" color="#900" style={{ fontSize: 30 }}>
            wallet demo
          </Link>
        </li>
        <li>
          <Link href="/rpc" color="#900" style={{ fontSize: 30 }}>
            rpc demo
          </Link>
        </li>
        <li>
          <Link href="/login" color="#900" style={{ fontSize: 30 }}>
            interface demo
          </Link>
        </li> */}
      </div>
      <div style={{borderTop: '1px solid #999'}}>
        <div style={{ width: '80%', margin: '0 auto'}}  className='flex justify-between items-stretch py-20'>
          <div  className='flex flex-col border-b-stone-600'>
            <h2 className='text-[#fff] 2xl:text-3xl xl:text3xl lg:text-3xl md:text-2xl sm:text-2xl font-bold'>KNexus</h2>
            <p className='mt-10 text-[#999]'>Email</p>
            <p className='text-[#999]'>xxx@knn3.xyz</p>
          </div>
          <div className='flex flex-row items-center flex-wrap justify-end'>
            <div className="mx-3 self-start">
              <Link href="/bucket" className={`${router.pathname === "/bucket" ? "text-[#BBE7E6]" : ""}`}>Bucket</Link>
            </div>
            <div className="mx-3 self-start">
              <Link href="/group" className={`${router.pathname === "/group" ? "text-[#BBE7E6]" : ""}`}>Group</Link>
            </div>
            <div className="mx-3 self-start">
              <Link href="/dataMarket" className={`${router.pathname === "/dataMarket" ? "text-[#BBE7E6]" : ""}`}>Data Market</Link>
            </div>
          </div>
        </div>
        <div style={{ width: '80%', margin: '0 auto', borderTop: '1px solid #3e3e3e'}} className='text-center text-sm py-10 relative'>
          ©2023 by Transformer. All rights reserved.
          <div className='flex md:absolute right-0 top-8 mt-4 md:mt-0 sm:m-auto sm:text-center sm:justify-center justify-center'>
            <Link href="https://twitter.com/Knn3Network" target="_blank" className='mx-1'><AiOutlineTwitter className='text-2xl' /></Link>
            <Link href="https://discord.com/invite/UKzFVpHk4J" target="_blank" className='mx-1'><BsDiscord className='text-2xl' /></Link>
            <Link href="https://t.me/+sgKwY295lKA1MWM1" target="_blank" className='mx-1'><SiTelegram className='text-2xl' /></Link>
            <Link href="https://medium.com/@KNN3_Network" target="_blank" className='mx-1'><AiFillMediumCircle className='text-2xl' /></Link>
            <Link href="https://mirror.xyz/knn3.eth" target="_blank" className='mx-1'>
              <Image src={mirror} alt='mirror' style={{width: 24, borderRadius: '50%'}} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
