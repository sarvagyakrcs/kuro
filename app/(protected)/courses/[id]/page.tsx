import { getCourseModules } from '@/actions/course/get-course-modules'
import CourseList from '@/modules/course/course-detail/components/course-list'
import React from 'react'

type Props = {
    params: {
        id: string
    }
}

const CourseDetailPage = async ({ params }: Props) => {
    const { id } = await params;
    const course = await getCourseModules(id)

    return (
        <CourseList modules={course} />
    )
}

export default CourseDetailPage;