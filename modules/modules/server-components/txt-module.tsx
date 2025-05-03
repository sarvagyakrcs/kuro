import { Module } from '@prisma/client'
import React from 'react'

type Props = {
  module: Module
}

const TxtModule = ({ module }: Props) => {
  return (
    <div>
      Txt Module
      <pre>{JSON.stringify(module, null, 2)}</pre>
    </div>
  )
}

export default TxtModule;