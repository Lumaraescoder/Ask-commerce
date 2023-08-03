import '../styles/global.css';
import type { AppProps } from 'next/app';
import Footer from '../components/Footer/footer'
import Navbar from '@/components/Navbar/Navbar';
import { CartProvider } from '@/contexts/CartContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <CartProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer/>
      </CartProvider>
    </div>
  );
};

export default MyApp;
