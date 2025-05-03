import { SomethingWentWrongPage } from '@/components/global/something-went-wrong-page'
import { prisma } from '@/lib/db/prisma'
import React from 'react'

type Props = {
    params: {
        id: string
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
        <div>
            <pre>{JSON.stringify(module, null, 2)}</pre>
        </div>
    )
}

export default ModulesPage