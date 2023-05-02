
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Products from '@/layouts/Products';

const Index = () => {
  
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
