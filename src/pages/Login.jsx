import React, {useState, useEffect} from 'react'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Signin from '../components/SignIn'
import Profile from '../components/Profile'
import Footer from '../components/Footer'

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState('');
    
    // Check for previous login state in localStorage on component mount 
    useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    
    if (loggedIn && userType) {
      setIsLoggedIn(JSON.parse(loggedIn));
      setUserType(JSON.parse(userType));
    }
    }, []);

    const handleLogin = (type) => {
        setUserType(type);
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('userType', JSON.stringify(type));

        if(type === 'user'){
          const address = 'Akshya Nagar, 1st Block, 1st Cross, Ramamurthy nagar, Bangalore-560016'
          localStorage.setItem('Address', address);
        } 
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserType('');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userType');
        localStorage.removeItem('Address');
        localStorage.removeItem('wishlist');
    };
  return (
    <>
    <MiniHeader/>
    <Header/>

    {isLoggedIn ? (
        <Profile userType={userType} handleLogout={handleLogout} />
      ) : (
        <Signin handleLogin={handleLogin} />
    )}

    <Footer/>
    </>
  )
}

export default Login