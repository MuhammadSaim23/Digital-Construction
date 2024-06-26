import React , {useEffect, useState} from 'react'
import {FaBars} from 'react-icons/fa'
import { Nav, NavContainer, NavLogo,NavText, MobileIcon, NavMenu, NavItem, NavLinks, Navbtn, NavBtnLink } from './NavbarElement'
import {animateScroll as scroll} from 'react-scroll'
import LOGO from '../../images/logo2.png'
const Navbar = ({toggle}) => {

    const [scrollNav , setScrollNav] = useState(false)

    const changeNav = ()=>{
        if(window.scrollY >= 80)
        {
            setScrollNav(true)
        }
        else{
            setScrollNav(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll',changeNav)
    }, [])

    const toggleHome = () => {
        scroll.scrollToTop();
    }
  return (
    <>
    <Nav scrollNav={scrollNav}>
   <NavContainer>
   <NavLogo to='/' onClick={toggleHome}><img src={LOGO} alt='logo'/></NavLogo>
   <NavText to='/' onClick={toggleHome}>Digital Construction</NavText>
    <MobileIcon onClick={toggle}>
    <FaBars />
    </MobileIcon>
    <NavMenu>
        <NavItem>
            <NavLinks to="about" 
            smooth={true} duration={800} spy={true} exact='true' offset={-80}  >About</NavLinks>
        </NavItem>
        <NavItem>
            <NavLinks to="discover" smooth={true} duration={800} spy={true} exact='true' offset={-80}>Discover</NavLinks>
        </NavItem>
        <NavItem>
            <NavLinks to="services" smooth={true} duration={800} spy={true} exact='true' offset={-80}>Services</NavLinks>
        </NavItem>
        <NavItem>
            <NavLinks to="signup" smooth={true} duration={800} spy={true} exact='true' offset={-80}>Sign Up</NavLinks>
        </NavItem>
    </NavMenu>
    <Navbtn>
        <NavBtnLink to="/signin">Sign In</NavBtnLink>
    </Navbtn>
   </NavContainer>
    </Nav>
    </>
  )
}

export default Navbar