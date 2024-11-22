import { useState } from "react";
import Logo from '../assets/img/foodvilla.jpg';
import {Link} from 'react-router-dom';
const Title = () => (
    <a href='/'>
   <img className="head-logo" src={Logo} alt='logo'/>
   </a>
)
const Header= () =>{
    const [isLoggedin, setIsLoggedin] = useState(true);
    return( <div className='Header'>
            <Title/>
            <div className='nav-items'>
            <ul>
                <li><Link to="/" className="my-Link">Home</Link></li>
                <li><Link to="/about" className="my-Link">About</Link></li>
                <li><Link to="/contact" className="my-Link">Contact</Link></li>
                <li><Link to="" className="my-Link">Cart</Link></li>
                <li>
        {
        
        // javascript expression works over here
        // jsx curly braces - refer website document : www.react.org
        
        isLoggedin ? (
              <button
                className="logout-btn"
                onClick={() => setIsLoggedin(false)}
              >
                Logout
              </button>
            ) : (
              <button className="login-btn" onClick={() => setIsLoggedin(true)}>
                Login
              </button>
            )}
            </li>
            </ul>
         </div>
        </div>
        
    );
}

export default Header;

