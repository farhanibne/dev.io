import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import ListItem from '../components/ListItem'
import Post from '../components/Post'
import Navbar from '../components/Navbar'
import Survey from '../components/Survey'
import SideBar from '../components/Sidebar'
import { Listing } from '../data/Listing.seed'
import ConnectContainer from '../components/ConnectContainer'
import { SurveySeed } from '../data/Survey.seed'
import Modal from 'react-modal'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import CreatePostModal from '../components/CreatePostModal'
import { useAppContext } from '../context/context'

Modal.setAppElement('#__next')

const { chains, provider } = configureChains(
  [chain.goerli, chain.localhost],
  [
    infuraProvider({ apiKey: process.env.INFURA_API_KEY, priority: 1 }),
    jsonRpcProvider({
      priority: 2,
      rpc: chain => ({
        http: `HTTP://127.0.0.1:7545`,
      }),
    }),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#F5F5F5',
    padding: 0,
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(10, 11, 13, 0.75)',
  },
}

const Home = () => {
  const router = useRouter()
  const { posts } = useAppContext()

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className='main-container '>
          <Head>
            <title>Dev.to</title>
            <meta name='description' content='Generated by create next app' />
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <Navbar />
          <div className='app-container'>
          
            <aside className='main-nav-wrap'>
              <nav className='main-nav-extended'>
                <div className='main-nav-section'>
                  <ConnectContainer />
               
                </div>
              </nav>
            </aside>
            <main className='main-content'>
              {posts.map((item, index) => {
                return <Post {...item} key={index} />
              })}
            </main>
          
          </div>
        </div>
        <Modal
          isOpen={!!router.query.post}
          onRequestClose={() => router.push('/')}
          style={customStyles}
        >
          <CreatePostModal />
        </Modal>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default Home