import '../styles/global.css';

import type { AppProps } from 'next/app';

import { Navbar } from '@/layouts/Navbar';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
