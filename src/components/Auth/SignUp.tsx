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
            console.log(response);
            localStorage.setItem("token",response.data.token)
            // window.location.href = "/signin"  // causing the window to relaod
        }
        else alert("Password not matching")
    }
  return (
    <form onSubmit={submitHandler}>
        <input required autoFocus = {true} placeholder="username" type="text" onChange={e=>setUsername(e.target.value)} value={username} />
        <span onClick={()=>setShow(e=>!e)} >Show</span>
        <input required type={show ? "text" : "password"} placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <input required type={show ? "text" : "password"} placeholder="re-enter password" onChange={e=>setConfirmPassword(e.target.value)} />
        <button>SignUp</button>
    </form>
  )
}

export default SignUp