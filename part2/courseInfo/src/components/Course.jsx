import Content from './Content'
import Header from './Header'
import Total from './Total'

const Course = ({ course }) => {
    console.log(course)
    return (
        <>
            <Header title = {course.name} />
            <Content parts = {course.parts} />
            <Total parts = {course.parts} />
        </>
    )
}

export default Course