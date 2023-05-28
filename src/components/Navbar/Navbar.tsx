import React from "react";

import Submenu from "../SubMenu/SubMenu";


export const Navbar = () => {

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left section - Links */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="text-white font-bold text-xl">
                  Ask-commerce
                </a>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {/* <a
                    href="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </a> */}
    
                  {/* Add more links as needed */}
                </div>
              </div>
            </div>
            {/* Middle section - Search Bar */}
            <div className="flex justify-center flex-1">
              <div className="w-full max-w-sm">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C9.44 16 10.8 15.55 12 14.74V17.25L15.25 14L17 15.25L13.75 18.5H17V20H13.75L12 18.75L10.25 20H7V18.5H10.25L9 17.25V14.74C6.13 16.54 3.46 13.87 5.26 11H2V9H5.26C3.46 6.13 6.13 3.46 9 5.26V2H10V5.26C13.87 3.46 16.54 6.13 14.74 9H18V11H14.74C16.54 13.87 13.87 16.54 11 14.74V12H9V14.74C5.13 13.36 2.36 9.61 4.74 6H1V4H4.74C2.36 0.39 6.13 -2.28 9 0H8Z"
                      />
                    </svg>
                  </div>
                  <input
                    id="search"
                    className="block w-full pl-10 pr-3 py-2 rounded-md placeholder-gray-500 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="search"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
            {/* Right section */}
            <div className="flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Register
                  </a>
                  {/* Add more links as needed */}
                </div>
            </div>
          </div>
        </div>
      </nav>
      <Submenu/>
    </div>
  );
};

export default Navbar;
