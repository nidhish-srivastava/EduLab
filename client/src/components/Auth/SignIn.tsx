import { useState } from "react";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/auth/login`, {
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        }
      });
      console.log(response);
      const data = await response.json();
      if(response.status==403 || response.status==400){
        alert(data.message)
      }
      if(response.status==200){
        localStorage.setItem("token", data.token);
        window.location.href = "/"; // causing the window to relaod
      }
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={submitHandler} className="form">
      <h2 className="center">Sign In</h2>
      <input
        required
        autoFocus={true}
        placeholder="username"
        type="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <div className="password-input">
        <input
          required
          type={show ? "text" : "password"}
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span onClick={() => setShow((e) => !e)} className="show-name">
          <i className="fa-solid fa-virus"></i>
        </span>
      </div>
      <button className="form-submit-btn">SignIn</button>
    </form>
  );
}

export default SignIn;
