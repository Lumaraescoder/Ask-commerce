import { useRouter } from 'next/router';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Products from '@/layouts/Products';

const Index = () => {
  const router = useRouter();

  return (
    <Main
      meta={
        <Meta
          title="title"
          description=""
        />
      }
    >
      <Products/>
    </Main>
  );
};

export default Index;
