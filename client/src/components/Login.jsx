import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css"

const Login = () => {
  return (
    <div>
      <div className="bodysign">
        {/* <div className='loginpage'> */}
        <div className="container">
          <div className="col-md-6">
            <div className="card p-4" id="loginForm">
              <h5 className="card-title text-center mb-4">Login</h5>
              <form>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="loginEmail"
                    placeholder="Your Email"
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="loginPassword"
                    placeholder="Password"
                  />
                </div>
                <br />
                <div className="center-container">
                  <button type="submit" className="btn btn-success btn-block">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login
