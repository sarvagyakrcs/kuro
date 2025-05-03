import { SomethingWentWrongPage } from '@/components/global/something-went-wrong-page'
import { prisma } from '@/lib/db/prisma'
import QuizModule from '@/modules/modules/server-components/quiz-module'
import MdModule from '@/modules/modules/server-components/md-module'
import TxtModule from '@/modules/modules/server-components/txt-module'
import VideoModule from '@/modules/modules/server-components/video-module'
import { Module, ModuleType } from '@prisma/client'
import React from 'react'

type Props = {
    params: {
        id: string
    }
}

const renderModule = (module: Module) => {
    switch(module.moduleType){
        case ModuleType.TEXT:
            return <TxtModule module={module} />
        case ModuleType.VIDEO:
            return <VideoModule module={module} />
        case ModuleType.QUIZ:
            return <QuizModule module={module} />
        case ModuleType.MD:
            return <MdModule module={module} />
    }
}

const ModulesPage = async ({ params }: Props) => {
    const { id } = await params;
    const module = await prisma.module.findUnique({
        where: {
            id: id
        }
    })

    if(!module){
        return <SomethingWentWrongPage />
    }

    return (
        renderModule(module)
    )
}

export default ModulesPage