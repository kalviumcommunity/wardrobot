import "./navbars.css"
import { Link } from "react-router-dom";
const Navbar =()=>{
return(
    <div>
        <ul>
            <li> <Link id="link" to='/'>Home</Link> </li>
            <li><Link id="link" to='/'>About</Link></li>
            <li><Link id="link" to='/'>Login</Link></li>
            <li><Link id="link" to='/'>Sign up</Link></li>
        </ul>
    </div>
    )
}
export default Navbar;