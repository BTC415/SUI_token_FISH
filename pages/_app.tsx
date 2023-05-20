import '../styles/globals.css';
import '@suiet/wallet-kit/style.css';
import '../components/App.css';
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />;
      <ToastContainer />
    </>
  ) 
}
