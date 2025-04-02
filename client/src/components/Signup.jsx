import React, { useState } from 'react';
import axios from 'axios';
import "./Signup.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request with the form data
      const response = await axios.post('YOUR_API_ENDPOINT', formData);

      // Handle the response as needed (e.g., redirect, show a success message)
      console.log(response.data);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error during signup:', error);
    }
  };

  return (
    <div>
      <div className="bodysign">
        <div className="container">
          <div className="col-md-6">
            <div className="card p-4">
              <h5 className="card-title text-center mb-4">Register Here</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <br />
                <div className='center-container'>
                  <button type="submit" className="btn btn-success btn-block">Signup</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
