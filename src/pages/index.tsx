import { useRouter } from 'next/router';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Products from '@/layouts/Products';

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
    <Products />
    </div>
  );
};

export default Index;
