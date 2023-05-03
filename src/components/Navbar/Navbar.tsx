import Link from 'next/link';
import SubMenu from '../SubMenu/submenu';

  
export const Navbar = () => {


  
  return (
    <>
      <nav className="flex flex-wrap items-center bg-gray-700 p-3 ">
        <Link legacyBehavior href="/">
          <a className="mr-4 inline-flex items-center p-2 ">            
            <span className="text-xl font-bold uppercase tracking-wide text-white">
              Ask-Commerce
            </span>
          </a>
        </Link>
        <div className="hidden w-full lg:inline-flex lg:w-auto lg:grow">
          <div className="flex w-full flex-col items-start lg:ml-auto lg:inline-flex lg:h-auto  lg:w-auto lg:flex-row lg:items-center">
          <Link legacyBehavior href="/">
              <a data-testid="Services" className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-gray-600 hover:text-white lg:inline-flex lg:w-auto">
                Services
              </a>
            </Link>
            <Link legacyBehavior href="/">
              <a data-testid="Services" className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-gray-600 hover:text-white lg:inline-flex lg:w-auto">
                Services
              </a>
            </Link>
            <Link legacyBehavior href="/about">
              <a data-testid="About" className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-gray-600 hover:text-white lg:inline-flex lg:w-auto">
                About us
              </a>
            </Link>
            <Link legacyBehavior href="/contact">
              <a data-testid="Contact" className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-gray-600 hover:text-white lg:inline-flex lg:w-auto">
                Contact us
              </a>
            </Link>

            <SubMenu />
          </div>
        </div>
      </nav>
    </>
  );
};
