"use server"
import React from 'react'
import { Module } from '@prisma/client'
import MdModuleClient from '../client-components/md-module-client'

type Props = {
  module: Module
}

const MdModule = async ({ module }: Props) => {
  return (
    <MdModuleClient module={module} />
  )
}

export default MdModule;