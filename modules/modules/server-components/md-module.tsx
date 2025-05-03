"use server"

import React from 'react'
import { Module } from '@prisma/client'
import MdModuleClient from '../client-components/md-module-client'

type Props = {
  module: Module
}

/**
 * Server component for displaying markdown module content
 * Simply renders the client component with module data
 */
export default async function MdModule({ module }: Props) {
  return <MdModuleClient module={module} />
}