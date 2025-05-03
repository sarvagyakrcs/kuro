"use client"
import { Session } from 'next-auth'
import React from 'react'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/ui/dropdown'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import { signOut } from 'next-auth/react'


type Props = {
    session: Session | null
}
//TODO: make it functinonal
const UserButton = ({ session }: Props) => {
  return (
    <Dropdown>
      <DropdownButton outline>
        <Image 
            src={session?.user?.image || '/default-profile-pic.png'}
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
            priority
        />
        <ChevronDownIcon />
      </DropdownButton>
      <DropdownMenu>
        <DropdownItem href="/users/1">View</DropdownItem>
        <DropdownItem href="/users/1/edit">Edit</DropdownItem>
        <DropdownItem
          onClick={
            () => {
              signOut({ callbackUrl: '/' })
            }
          }
        >
          <span>Log out</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserButton