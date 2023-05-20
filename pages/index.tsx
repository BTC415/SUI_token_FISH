import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { WalletProvider } from '@suiet/wallet-kit';
import App from '../components/App';

export default function Home() {
  return (
    <WalletProvider>
      <div className={styles.container}>
        <Head>          
          <title>FISH</title>       
          <link href="https://fonts.googleapis.com/css?family=Poppins:400,500,700|Rubik:300,400,500" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css?family=Press+Start+2P:400,500,700|Rubik:300,400,500" rel="stylesheet"/>
          <link rel="stylesheet" type="text/css" href="css/pe-icon-7-stroke.css" />
          <link rel="stylesheet" type="text/css" href="css/materialdesignicons.min.css" />
          <link rel="stylesheet" type="text/css" href="css/waves.css" />
          <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
          <link rel="stylesheet" href="css/magnific-popup.css"/>
          <link rel="stylesheet" type="text/css" href="css/style.css" />
          <link rel="stylesheet" href="css/colors/red.css" id="color-opt" /> 
          <link rel="stylesheet" href="css/dark.css" id="dark-light" /> 
        </Head>
        <App />
      </div>
    </WalletProvider>
  );
}
