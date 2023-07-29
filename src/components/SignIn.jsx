import React from 'react'
import { toast } from 'react-toastify'
import SigninCSS from '../css/signin.module.css'

const SignIn = ({handleLogin}) => {

    const handleLoginClick = (type) => {
        handleLogin(type)
        if(type === 'guest'){
            toast.success('You logged in as Guest!')
        }else if(type === 'user'){
            toast.success('You logged in as an User!')
        }
    }
  return (
    <>
    <div className={SigninCSS.container}>
        <div className={SigninCSS.card}>
            <h1 align='center' style={{padding: '20px 0px 0px 0px',color:'#1B4332'}}>Login</h1>
                <button className={SigninCSS.btn} style={{marginTop:'30px'}} onClick={() => handleLoginClick('guest')}>
                    Login as Guest
                </button><br></br>
                <button className={SigninCSS.btn} onClick={() => handleLoginClick('user')}>
                    Login as User
                </button>
                <p align='center' style={{fontSize:'12px',marginTop:'10px'}}>
                    You are agreed our to Terms and Conditions!
                </p>
        </div>
    </div>
    </>
  )
}

export default SignIn
