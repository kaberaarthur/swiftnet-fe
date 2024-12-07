import { LearningFilter } from '@/Constant'
import { useState } from 'react'
import { Button, Row } from 'reactstrap'
import CategoriesCheckBoxes from './CategoriesCheckBoxes/CategoriesCheckBoxes'
import CourseCategories from './CourseCategories'
import UpcomingCourses from './UpcomingCourses/UpcomingCourses'

const CourseFilter = () => {
  const [filter,setFilter]= useState(false)
  return (
    <div className="md-sidebar">
      <Button color="primary" className="email-aside-toggle md-sidebar-toggle" onClick={()=>setFilter(!filter)}>{LearningFilter}</Button>
      <div className={`md-sidebar-aside job-sidebar custom-scrollbar ${filter ? "open" : ""}`}>
        <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc">
          <Row>
            <CourseCategories />
            <CategoriesCheckBoxes />
            <UpcomingCourses />
          </Row>
        </div>
      </div>
    </div>
  )
}

export default CourseFilter