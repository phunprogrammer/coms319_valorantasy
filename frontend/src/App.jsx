import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter as Router,
  Route, 
  Routes, 
  Link,
  useNavigate,
} from "react-router-dom";

function Main() {
  const [leagues, setLeagues] = useState([]);
  useEffect(() => {
    fetchLeagues();
  }, []);

  function fetchLeagues(userName) {
    fetch(`http://localhost:3000/getUserLeagues/${userName}`)
    .then(response => response.json())
    .then(leagues => setLeagues(leagues))
    .catch(error => console.error("Error fetching user's leagues: ", error));
  }

  function fetchLeagues() {
    fetch('http://localhost:3000/leagues', { mode: 'no-cors' })
  .then(response => {
    console.log('Request successful');
  })
  .catch(error => {
    console.error('Request failed:', error);
  });
  }

  function deleteLeague(id) {
    fetch(`http://localhost:3000/leagues/${id}`, {method: 'DELETE'})
    .then(response => fetchLeagues())
    .catch(error => console.error("Error deleting league: ", error))
  }

  function updateLeague(league) {
    fetch('http://localhost:3000/leagues' , {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(league),
    }) 
    .then(response => fetchLeagues())
    .catch(error => console.error("Error updating league: ", error))
  }

  function addLeague(league) {
    fetch(`http://localhost:8081/league`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(league),
    })
      .then(response => fetchLeagues())
      .catch(error => console.error("Error adding item: ", error));
  }

  function ShowLeagues({ league, index }) {
    
    const [isEditing, setIsEditing] = useState(false);
    const [editedLeague, setEditedLeague] = useSTate({ ...league })

    const handleDelete = (leagueId) => {
      if(window.confirm("Do you really want to delete your league?"))
        deleteLeague(leagueId)

    }

    const handleEdit = () => {
      setIsEditing(true)
      setEditedLeague({ ...league })
    }

    const handleSave = () => {
      const updatedLeague = {
        
      }
      updateLeague(updatedLeague)
      setIsEditing(false)
    }

    const handleCancel = () => {
      setIsEditing(false)
      setEditedLeague({ ...league })
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedLeague(prevState => ({
        ...prevState,
        [name]: value
      }))
    }

    return (
      <div>
        <div className="d-flex text-body-secondary pt-3">
          <img href={league.imageUrl} width="32" height="32" />
          <p className="pb-3 mb-0 small lh-sm border-bottom">
          
          {isEditing ? (<input type="text" name="imageUrl" value={editedLeague.imageUrl} onChange={handleChange} />) : (<></>)}
          <div className="card-body">
            {isEditing ? (
              <>
                <input type="text" name="name" value={editedLeague.name} onChange={handleChange} />
                <input type="text" name="draftDate" value={editedLeague.draftDate} onChange={handleChange} />
                <input type="text" name="category" value={editedLeague.category} onChange={handleChange} />
              </>
            ) : (
              <p className="card-text">
                <strong>{item.title}</strong> <br />
                <ul>
                  <strong className="d-block text-gray-dark">{league.name}</strong>
                  <strong className="d-block text-gray-dark">{league.number}</strong>
                  <strong className="d-block text-gray-dark">{league.draftDate}</strong>
                </ul>
              </p>
            )}
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                {isEditing ? (
                  <>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleSave}>Save</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleEdit}>Modify</button>
                )}
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleDelete(league.id)}>Delete</button>
              </div>
            </div>
          </div>

      </p>

    </div>

      </div>
    )

  }



  
  function Create() {
    return(
      <div>

      </div>
    )
  }


  function Draft() {
    return(
      <div>

      </div>
    )
  }


  function Home() {



    return( 
      <div>
        

      
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
          <img className="mb-4" src=".\images\logo-large.png" alt="" width="72" height="57" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/createLeague">Create A League</Link>
                </li>
                <li className="nav-item">
                  <Link to="/leagues">Join A League</Link>
                </li>
                
              </ul>
            </div>
          </div>
        </nav>

        <div className="my-3 p-3 bg-body rounded shadow-sm">
    <h6 className="border-bottom pb-2 mb-0">User Leagues</h6>
    {leagues.map((league, index) => (
      <ShowLeagues league={league} index={index} />
    ))}
  </div>

      </div>
    )
  }



  function Register() {
    const nav = useNavigate();


    const handleRegister = async (event) => {
      event.preventDefault();
      const usernameInput = document.getElementById('floatingInput');
      const passwordInput = document.getElementById('floatingPassword');
    
      const username = usernameInput.value;
      const password = passwordInput.value;
    
      try {
        const response = await fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
    
        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage);
        }
    
        console.log("Sign up successful!");
        
        nav('/')
        
      } catch (error) {
        console.error('Sign up failed:', error.message);
      }
    
    }


    return(
      <div>
        <link href="sign-in.css" rel="stylesheet" />
        <main className="form-signin w-100 m-auto">
          <form>
            <img className="mb-4" src="..\images\logo-large.png" alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Sign up</h1>

            <div className="form-floating">
              <input type="username" className="form-control" id="floatingInput" placeholder="username" />
              <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit" onClick={(e) => handleRegister(e)}>Sign up</button>
            <p className="mt-5 mb-3 text-body-secondary"> Already have an account?</p>
            <Link to="/login"><button className="btn btn-primary w-100 py-2" type="submit" >Log in</button></Link>
            
          </form>
        </main>
        <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>

      </div>
    )
  }

  function Login() {
    const nav = useNavigate();


    const handleLogin = async (event) => {
      event.preventDefault();
      const usernameInput = document.getElementById('floatingInput');
      const passwordInput = document.getElementById('floatingPassword');
    
      const username = usernameInput.value;
      const password = passwordInput.value;
    
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
    
        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage);
        }
    
        console.log("Login successful!");
        nav('/')
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    };
    


    return (
      <div>
        <link href="sign-in.css" rel="stylesheet" />
        <main className="form-signin w-100 m-auto">
          <form>
            <img className="mb-4" src="frontend\src\images\logo-large.png" alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Sign in</h1>

            <div className="form-floating">
              <input type="username" className="form-control" id="floatingInput" placeholder="username" />
              <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit" onClick={(e) => handleLogin(e)}>Sign in</button>
            <p className="mt-5 mb-3 text-body-secondary"> Don't have an account?</p>
            <Link to="/register"><button className="btn btn-primary w-100 py-2" type="submit" >Sign up</button></Link>
            
          </form>
        </main>
        <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>


      </div>
    )
  }






  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home /> } />
        <Route path="/draft" element={<Draft />} /> 
        <Route path="/createLeague" element={<Create />} />
      </Routes>
    </Router>
  )
}

export default Main
