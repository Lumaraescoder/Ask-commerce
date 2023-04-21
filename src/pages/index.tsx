import { useRouter } from 'next/router';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import ProductList from '@/layouts/Products';
import { useState } from 'react';

const Index = () => {
  const router = useRouter();
  return (
    <div>
    <Main
      meta={
        <Meta
          title="title"
          description=""
        />
      }
    >
    </Main>
    <ProductList />
    </div>
  );
};

export default Index;
