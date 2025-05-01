"use client"
import { DropdownItem, DropdownLabel } from '@/components/ui/dropdown'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { signOut } from 'next-auth/react'
import React from 'react'


const SignOutButton = () => {
    return (
        <DropdownItem
            onClick={
                () => {
                    signOut({ callbackUrl: '/' })
                }
            }
        >
            <ArrowRightStartOnRectangleIcon />
            <DropdownLabel>Sign out</DropdownLabel>
        </DropdownItem>
    )
}

export default SignOutButton