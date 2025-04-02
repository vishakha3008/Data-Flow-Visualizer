// export default Navbar;
import { Link } from 'react-router-dom';


const Navbar = () => {
  // const { loginWithPopup } = useAuth0();

  return (
    <div>
         {/* <div className='container'> */}
      <nav className="navbar navbar-expand-lg"style={{backgroundColor: '#adb5bd', height:'50px'}}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">TEAM 18</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workspace">Get started</Link>
              </li>
            </ul>
            <form className="d-flex gap-2" role="search">
              <Link to="/signup" className="btn btn-primary me-md-2">View Profile</Link>
              {/* <Link to="/login" className="btn btn-primary me-md-2">Login</Link> */}

             
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}


export default Navbar;