import '../styles/global.css';
import type { AppProps } from 'next/app';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
      <Footer/>
    </div>
  );
};

export default MyApp;
