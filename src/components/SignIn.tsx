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
    <form onSubmit={submitHandler}>
        <input required autoFocus = {true} placeholder="username" type="username" onChange={e=>setUsername(e.target.value)} value={username} />
        <span onClick={()=>setShow(e=>!e)} >Show</span>
        <input required type={show ? "text" : "password"} placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button>SignIn</button>
    </form>
  )
}

export default SignIn