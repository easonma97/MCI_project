import React, {useState} from "react";
import axios from "axios";

function Login(){ 
    const [user, setUser] = useState({username: '', password: ''});

    const handleSubmit = (e) => {
        e.preventDefault();
      
        axios.post('http://localhost:8080/users/login', user)
        .then(res => {
          console.log(res.data);
          if(res.data.text === "Success"){
            sessionStorage.setItem('user_id', JSON.stringify(res.data.id))
            window.location.href = "/page";
          }
          
          if (res.data.text === "Username invalid"){
            alert("Your username is incorrect! Please try again!");
            window.location.href = "/login";
          }

          if (res.data.text === "Fail"){
            alert("Your password is incorrect! Please try again!");
            window.location.href = "/login";
          }
        })
    }

    const handleNameInputChange = (event) => {
        event.persist();
        setUser((values) => ({
            ...values,
            username: event.target.value,
        }));
    };

    const handlePasswordInputChange = (event) => {
        event.persist();
        setUser((values) => ({
            ...values,
            password: event.target.value,
        }))
    };

    return <div className="limiter">
    <div className="container-login100 signupbackground" style={{backgroundImage:"url("+require("../assets/img/login.jpg").default+")"}}>
      <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
        <form className="form login100-form validate-form" onSubmit={handleSubmit}>
          <span className="login100-form-title p-b-55">
            Login
          </span>
          <div className="wrap-input100 validate-input m-b-16" data-validate="Username is required">
            <input className="input100" type="text" name="username" placeholder="Username" value={user.username} onChange={handleNameInputChange} />
            <span className="focus-input100" />
            <span className="symbol-input100">
              <span className="lnr lnr-user" />
            </span>
          </div>
          <div className="wrap-input100 validate-input m-b-16" data-validate="Password is required" value={user.password} onChange={handlePasswordInputChange}>
            <input className="input100" type="password" name="pass" placeholder="Password" />
            <span className="focus-input100" />
            <span className="symbol-input100">
              <span className="lnr lnr-lock" />
            </span>
          </div>
          <div className="container-login100-form-btn p-t-25">
            <button className="login100-form-btn" type="submit">
              Login
            </button>
          </div>
          <div className="text-center w-full p-t-115">
            <span className="txt1">
              Not a member?
            </span>
            <a className="txt1 bo1 hov1" href='/signUp'>
              Sign up now							
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
} 

export default Login;
