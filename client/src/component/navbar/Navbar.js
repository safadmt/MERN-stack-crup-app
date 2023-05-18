import { Link , Outlet} from 'react-router-dom';

const Navbar = ()=> {
    return (
        <div>
            
            <nav className="navbar navbar-expand-lg navbar-info bg-info ps-3">
  <Link to='/' className="navbar-brand">User Management System</Link>
  
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
    <li className="nav-item">
        <Link to="/register" className="nav-link ">Register</Link>
    </li>
      
    </ul>
  </div>
</nav>
            
            <Outlet/>
        </div>
    )
}

export default Navbar;