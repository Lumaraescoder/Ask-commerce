import Document, { Head, Html, Main, NextScript } from 'next/document';

import { AppConfig } from '@/utils/AppConfig';
import { Footer } from '@/components/Footer/footer';
import Navbar from '@/components/Header/Header';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head />
        <body>
          <Navbar/>
          <Main />
          <NextScript />
          <Footer/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
