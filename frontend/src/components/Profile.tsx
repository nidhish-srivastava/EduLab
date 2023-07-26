import a from '../blank.jpg'
import { useCourseContext } from '../context/context'
function Profile() {
    const final = useCourseContext()
  return (
    <main className='profile-page-container'>
        <div className="profile-image-wrapper">
            <img src={a} alt="" />
        </div>
        <h3>Hello {final?.userEmail}</h3>
    </main>
  )
}

export default Profile