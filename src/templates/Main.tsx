import Link from 'next/link';
import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';
import ProductList from '@/layouts/Products';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}

    <div className="mx-auto max-w-screen-md">
      <header className="border-b border-gray-300">
      </header>

      <main className="content py-5 text-xl">{props.children}</main>
    </div>
  </div>
);

export { Main };
