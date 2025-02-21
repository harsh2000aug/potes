import React from 'react'
import '../App.css'
import loginImg from '../images/loginmob.png'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigation = useNavigate();
    const goToRegister = () =>{
        navigation("/register")
    }
  return (
    <div className='login'>
        <div className="flex">
            <div className="col-40 login-left">
                <h1>Organize, Connect, and Stay in Touch Effortlessly!</h1>
                <img src={loginImg} alt="" />
            </div>
            <div className="col-60 login-text">
                <h3>Log In</h3>
                <form action="">
                    <div className="form-control">
                        <div className="coolinput">
                            <label className="text">Email:</label>
                            <input type="text" name="email" className="input"/>
                        </div>
                    </div>
                    <div className="form-control">
                        <div className="coolinput">
                            <label className="text">Password:</label>
                            <input type="password" name="password" className="input"/>
                        </div>
                    </div>
                    <div className="form-control">
                        <input type="submit" name="Log in" className='submitBtn'/>
                    </div>
                </form>
                <h5>Already have an account? <b onClick={goToRegister}>Register</b></h5>
            </div>
        </div>
    </div>
  )
}

export default Login