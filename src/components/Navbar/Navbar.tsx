import Link from "next/link";

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
              <a
                data-testid="Services"
                className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-gray-600 hover:text-white lg:inline-flex lg:w-auto"
              >
                Services
              </a>
            </Link>
            <Link legacyBehavior href="/about">
              <a
                data-testid="About"
                className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-gray-600 hover:text-white lg:inline-flex lg:w-auto"
              >
                About us
              </a>
            </Link>
            <Link legacyBehavior href="/contact">
              <a
                data-testid="Contact"
                className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-gray-600 hover:text-white lg:inline-flex lg:w-auto"
              >
                Contact us
              </a>
            </Link>
            <Link legacyBehavior href="/cart">
            <button className="mx-5">
              <div className="relative py-1 mr-5">
                <div className="t-0 absolute left-3">
                  <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                    <span>0</span>
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="mt-4 mb-3 h-7 w-7"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
            </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
