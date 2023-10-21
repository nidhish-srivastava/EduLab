import { useState } from "react";
import { baseUrl } from "../../utils"

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (confirmPassword == password) {
      const response = await fetch(`${baseUrl}/auth/signup`, {
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        }
      });
      const data = await response.json();
      localStorage.setItem("token", data.token);
      alert("Account created Successfully");
      window.location.href = "/";
    } else alert("Password not matching");
  };
  return (
    <form onSubmit={submitHandler} className="form">
        <h2 className="center">Sign Up</h2>
      <input
        required
        autoFocus={true}
        placeholder="username"
        type="text"
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
      <input
        required
        type={show ? "text" : "password"}
        placeholder="re-enter password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className="form-submit-btn">SignUp</button>
    </form>
  );
}

export default SignUp;
