import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';


function Login() {

  const [credentials,setCredentials]=useState({email:"",password:""});
const navigate=useNavigate();

  const handleSubmit=async(e)=>{
  e.preventDefault();
  const response=await fetch("http://localhost:5000/api/loginuser",{
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({
          email:credentials.email,
          password:credentials.password
      })
  })
  const json=await response.json();
  console.log(json);
  if(!json.success)alert('Invalid credentials!! Please enter valid credentials');
  if(json.success){
    localStorage.setItem("userEmail",credentials.email);
    localStorage.setItem("authToken",json.authToken);
    console.log(localStorage.getItem("authToken"));
    navigate("/");
  }
  }
  
  const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  

  return (
    <div >
    <div>
    <Navbar />
    </div>

<div className="card container mt-5 justify-content-center align-items-center " style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '80vh' }}>
<form onSubmit={handleSubmit}>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
  </div>
  
  <button type="submit" className="m-3 btn btn-success">Login</button>
  <Link to='/createuser' className="m-3 btn btn-danger">New User</Link>
</form>
</div>
    </div>
    
  )
}

export default Login
