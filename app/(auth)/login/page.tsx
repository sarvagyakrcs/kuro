import SignInForm from '@/modules/auth/components/sign-in-component'
import React from 'react'

type Props = {}

const LoginPage = (props: Props) => {
  return (
    <div className='h-[calc(100vh-100px)] w-full flex items-center justify-center'>
        <SignInForm type="form" modalLabel="icon" />
    </div>
  )
}

export default LoginPage