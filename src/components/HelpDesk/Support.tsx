import {useState} from 'react'
import a from './2.jpg'
import axios from 'axios'
function Support() {
    const [problem,setProblem] = useState("")
    const sendProblemHandler = async() =>{
       await axios.post(`http://localhost:3000/support`,{
        problem
      })
      alert("Our team will look into your Problem")
    }
  return (
    <div className='support-page-container'>
    <div className="support-img-banner">
        <img src={a} alt="" />
    </div>
    <div className="input-bar-container">
        <label htmlFor=""  >How Can we Help You?</label>
        <textarea spellCheck={false} rows={3} cols={50}  value={problem} placeholder='Enter your Problem...' onChange={e=>setProblem(e.target.value)} />
        <button disabled={problem.length==0} onClick={sendProblemHandler} >Submit</button>
    </div>
    </div>
  )
}

export default Support