import {useState} from "react";
import axios from "axios";

function SignIn() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [show,setShow] = useState(false)

    const submitHandler = async(e : any) =>{
        e.preventDefault()
            const response = await axios.post(`http://localhost:3000/admin/login`,{
                username : username,
                password : password
            })
            console.log(response);
            localStorage.setItem("token",response.data.token)
            alert("Logged In Successfully")
            window.location.href = "/"  // causing the window to relaod
    }

  return (
    <form onSubmit={submitHandler} className="form">
        <input required autoFocus = {true} placeholder="username" type="username" onChange={e=>setUsername(e.target.value)} value={username} />
        <div className="password-input">
        <input required type={show ? "text" : "password"} placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <span onClick={()=>setShow(e=>!e)} className="show-name">
        <i className="fa-solid fa-virus"></i>
        </span>
        </div>
        <button className="form-submit-btn" >SignIn</button>
    </form>
  )
}

export default SignIn