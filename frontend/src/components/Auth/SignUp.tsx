import {useState} from "react";
import axios from "axios";

function SignUp() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [show,setShow] = useState(false)

    const submitHandler = async(e : any) =>{
        e.preventDefault()
        if(confirmPassword==password){
            const response = await axios.post(`http://localhost:3000/admin/signup`,{
                username : username,
                password : password
            })
            // console.log(response);
            localStorage.setItem("token",response.data.token)
            // window.location.href = "/signin"  // causing the window to relaod
            alert("Account created,Now Sign In to continue!!!")
        }
        else alert("Password not matching")
    }
  return (
    <form onSubmit={submitHandler} className="form">
        <input required autoFocus = {true} placeholder="username" type="text" onChange={e=>setUsername(e.target.value)} value={username} />
        <div className="password-input">
        <input required type={show ? "text" : "password"} placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <span onClick={()=>setShow(e=>!e)} className="show-name" >
        <i className="fa-solid fa-virus"></i>
        </span>
        </div>
        <input required type={show ? "text" : "password"} placeholder="re-enter password" onChange={e=>setConfirmPassword(e.target.value)} />
        <button className="form-submit-btn" >SignUp</button>
    </form>
  )
}

export default SignUp