import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
export default function Login() {
  const [credentials, setCredentials] = useState({email: "", password: ""});
  let navigate=useNavigate()
  const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/LoginUser/", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
      });
      const json = await response.json();
      console.log(json);
      if (!json.success) {        
          alert("Enter Valid Credentials");
      }
      else
      {
        localStorage.setItem("userEmail",credentials.email);
        localStorage.setItem("authToken",json.authToken);
        navigate("/");
      }
  };

  const handleChange = (event) => {
      const { value, name } = event.target;
      setCredentials({
          ...credentials,
          [name]: value,
      });
  };

  return (
    <div>
            <div className='container'>
            <form onSubmit={handleSubmit}>                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={credentials.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password} onChange={handleChange} />
                </div>                              
                <button type="submit" className="m-3 btn btn-success">Submit</button>
                <Link to="/CreateUser" className="m-3 btn btn-danger">Sign Up</Link>
            </form>
        </div>
    </div>
  )
}
