"use client"
import React, { useState } from 'react';
import { Navbar, NavbarSection, NavbarItem, NavbarLabel, NavbarDivider, NavbarSpacer } from '@/components/ui/navbar';
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import SignInForm from '@/modules/auth/components/sign-in-component';
import { Session } from 'next-auth';
import { UserIcon } from '@heroicons/react/24/outline';
import SignUpForm from '@/modules/auth/components/sign-up-component';
import Logo from '@/components/global/logo';
import UserButton from './user-button';

const Header = ({ session } : {session : Session | null}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const categories = [
    "About us",  
    "Contact us",  
    "Working",  
];
  
  return (
    <>
      <header className="z-40 text-black">
        <div className="mx-auto max-w-7xl px-4">
          <Navbar>
            {/* Logo */}
            <Logo className='text-black' />
            
            <NavbarDivider className="hidden md:block" />
            
            {/* Categories - Hidden on mobile */}
            <NavbarSection className="hidden md:flex">
              {categories.map((category, index) => (
                <NavbarItem key={index} href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>
                  <NavbarLabel className='text-black'>{category}</NavbarLabel>
                </NavbarItem>
              ))}
              <NavbarItem href={`#pricing`}>
                  <NavbarLabel className='text-black'>{"Pricing"}</NavbarLabel>
                </NavbarItem>
            </NavbarSection>
            
            <NavbarSpacer />
            
            {/* Mobile Menu Button */}
            <NavbarItem className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </NavbarItem>
            
            {/* Search */}
            {/* <SearchDialog /> */}
            
            {/* User Account */}
            { session ? <UserButton session={session} /> : 
                <div className="flex items-center justify-between space-x-4">
                    <SignInForm type='modal' modalLabel='both' />
                    <SignUpForm type='modal' modalLabel='both' />
                </div>
            }
            
          </Navbar>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="flex h-16 items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4">
            <Logo />
            <button onClick={() => setMobileMenuOpen(false)}>
              <XIcon className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav className="mt-4 px-4">
            <ul className="space-y-4">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link 
                    href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block py-2 text-lg font-medium"
                  >
                    {category}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/search" className="flex items-center py-2 text-lg font-medium">
                  <SearchIcon className="mr-2 h-5 w-5" />
                  Search
                </Link>
              </li>
              <li>
                <Link href="/account" className="flex items-center py-2 text-lg font-medium">
                  <UserIcon className="mr-2 h-5 w-5" />
                  My Account
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;