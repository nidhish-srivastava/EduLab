import { useEffect,useState } from 'react'
import a from '../blank.jpg'
import { useCourseContext } from '../context/context'
import CourseResultCard from './CourseResultCard'
import { courseType } from './CreatingCourses/MyCourses'

function Profile() {
    const final = useCourseContext()
  const [data, setData] = useState<courseType[]>([]);

    const boughtCourses = async()=>{
      try {
        const response = await fetch(`http://localhost:3000/auth/fetchBoughtCourses/${final?.userName}`)
        const data = await response.json()
        setData(data)
      } catch (error) {
        
      }
    }
    useEffect(()=>{
      boughtCourses()
    },[])
  return (
    <main className='profile-page-container'>
      <div>
        <div className="profile-image-wrapper">
            <img src={a} alt="" loading='lazy' />
        </div>
        <h3 className='center'>Hello {final?.userName}</h3>
      </div>
        <div>
          <h3 className='courses-you-bought-label'>
          Courses you bought
          </h3>
        <div className="courses-container">
        {data?.map((course, i) => {
          return <CourseResultCard course={course} key={i} />;
        })}
      </div>
        </div>
    </main>
  )
}

export default Profile