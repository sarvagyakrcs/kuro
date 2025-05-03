import { Module } from '@prisma/client'
import React from 'react'

type Props = {
    module: Module
}

const QuizModule = ({ module }: Props) => {
  return (
    <div>
        Quiz Module
        <pre>{JSON.stringify(module, null, 2)}</pre>
    </div>
  )
}

export default QuizModule;