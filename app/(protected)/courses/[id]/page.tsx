import { getCourseModules } from '@/actions/course/get-course-modules'
import { SomethingWentWrongPage } from '@/components/global/something-went-wrong-page'
import CourseList from '@/modules/course/course-detail/components/course-list'
import React from 'react'

type Props = {
    params: Promise<{ id: string }>
}

const CourseDetailPage = async ({ params }: Props) => {
    const { id } = await params;
    const course = await getCourseModules(id)

    if(!course){
        return <SomethingWentWrongPage />
    }

    return (
        <div className="w-full px-0 sm:px-4">
            <CourseList modules={course} />
        </div>
    )
}

export default CourseDetailPage;