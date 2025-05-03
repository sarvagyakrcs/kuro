import React from 'react'
import { Module } from '@prisma/client'

type Props = {
  module: Module
}

const MdModule = ({ module }: Props) => {
  return (
    <div>
      Md Module
      <pre>{JSON.stringify(module, null, 2)}</pre>
    </div>
  )
}

export default MdModule;