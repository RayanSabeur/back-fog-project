import axios from 'axios';
import React, { useState } from 'react';

const SignIn = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e) => {
     
        e.preventDefault();

       

        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        
       


        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            data: {
              email,
              password,
            },
            withCredentials: true
          })
            .then((res) => {
              console.log(res);
              if (res.data.errors) {
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML = res.data.errors.password;
              } else {
                window.location = "/";
              }
            })
            .catch((err) => {
              console.log(err);
            });
        };




    return (
        <form action="" onSubmit={handleLogin} id="sign-up-form">
        <label htmlFor="email"> Email</label>
        <br />
        <input type="text" name='email' id='email' autoComplete="on"  className="formlogin" onChange={(e)=> setEmail(e.target.value)} value={email}/>

<div className='email error'></div>
        <br />
        <label htmlFor="password">Mot de passe </label>
        <br />
        <input type="password" name='password' id='password' autoComplete="on"  className="formlogin"   onChange={(e) => setPassword(e.target.value) } value={password} />
        <div className="password error"> </div>
        <br />
    <input type="submit" value="se connecter" className='submit-btn'/>

<br />
    </form>
    );
};

export default SignIn;