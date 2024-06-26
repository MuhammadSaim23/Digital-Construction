import React from 'react'
import './welcome.css';
import Logo from '../../images/logo2.png'
const Welcome = () => {
  return (
    <>
      <div class="containerVal">
        <h1 id="wc">Welcome to Digital Construction</h1>
        <div class="NavLogo22">
          <img src={Logo} alt="logo" />
        </div>
      </div>
    </>
  )
}

export default Welcome