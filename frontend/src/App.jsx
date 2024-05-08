import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  json,
} from "react-router-dom";

function Main() {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    fetchLeagues();
  }, []);

  async function getSelf() {
    return await fetch('http://localhost:3000/users', {
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error('Request failed:', error);
        reject(error);
      }); s
  }

  function fetchLeagues() {
    fetch('http://localhost:3000/leagues', {
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON data
      })
      .then(data => {
        setLeagues(data);
      })
      .catch(error => {
        console.error('Request failed:', error);
      });
  }

  function deleteLeague(id) {
    console.log(id);
    fetch(`http://localhost:3000/users/leagues/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        fetchLeagues();
      })
      .catch(error => {
        console.error("Error deleting league: ", error);
        alert("You must own the league in order to delete.");
      });
  }


  function renameLeague(league, id) {
    fetch(`http://localhost:3000/users/leagues/${id}/${league.name}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(league),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        fetchLeagues();
      })
      .catch(error => {
        console.error("Error updating league: ", error);
        alert("You must own the league in order to rename.");
      });
  }





  function addLeague(league) {
    fetch(`http://localhost:3000/users/leagues/${league.name}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(league),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        fetchLeagues();
        alert("League Created! Visit homepage to view.");

      })
      .catch(error => {
        console.error("Error adding item: ", error);
        alert("Please sign in to use create feature.");
      });
  }


  function join(id) {
    fetch(`http://localhost:3000/users/leagues/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },

    })
      .then(response => fetchLeagues())
      .catch(error => console.error("Error joining league: ", error));
  }

  function leave(id) {
    fetch(`http://localhost:3000/users/leagues/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        fetchLeagues();
      })
      .catch(error => {
        console.error("Error leaving league: ", error);
        alert("Must be apart of the league in order to leave.");
      });
  }






  const logout = async () => {
    await fetch(`http://localhost:3000/auth/logout`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .catch(error => console.error("Error logging out: ", error));
    window.location.reload();
  }


  const kick = async (userId, leagueId) => {
    await fetch(`http://localhost:3000/users/leagues/${leagueId}/${userId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(response => response.json())
      .catch(error => console.error("Error kicking member: ", error));
    window.location.reload();
  }


  function ShowLeague({ league }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedLeague, setEditedLeague] = useState({ ...league })

    const handleDelete = (leagueId) => {
      if (window.confirm("Do you really want to delete your league?"))
        deleteLeague(leagueId)
    }

    const handleEdit = () => {
      setIsEditing(true)
      setEditedLeague({ ...league })
    }

    const handleSave = (league) => {
      const updatedLeague = {
        _id: league._id,
        name: editedLeague.name,
        owner: league.owner,
        createdAt: league.createdAt,
        __v: league.__v
      }
      renameLeague(updatedLeague, league._id)
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

    const handleJoin = (id) => {
      join(id);
    }

    const handleLeave = (id) => {
      const confirmLeave = window.confirm("Are you sure you want to leave this league?");
      if (confirmLeave) {
        leave(id);
      } else {
      }
    }



    return (
      <div>
        <div>
          <div className="d-flex text-body-secondary pt-3">
            <div className="card-body">
              {isEditing ? (
                <>
                  <input type="text" name="name" value={editedLeague.name} onChange={handleChange} />
                </>
              ) : (
                <p className="card-text">
                  <strong className="d-block text-gray-dark">Name: {league.name}</strong>
                  <strong className="d-block text-gray-dark">ID: {league._id}</strong>
                </p>
              )}
              <div className="d-flex justify-content-between align-items-center">
                {isEditing ? (
                  <>
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleSave(league)}>Save</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleCancel}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleEdit}>Modify</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleDelete(league._id)}>Delete</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleJoin(league._id)}>Join</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleLeave(league._id)}>Leave</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }




  function ShowMembers({ leagueId }) {
    const [members, setMembers] = useState([]);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
      Promise.all([fetchMembers(leagueId), getSelf()])
        .then(([members, user]) => {
          setIsOwner(user._id === members[0].user._id);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }, [leagueId]);

    async function fetchMembers(id) {
      return await fetch(`http://localhost:3000/leagues/${id}/members`, {
        credentials: 'include'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setMembers(data);
          return data;
        })
        .catch(error => {
          console.error('Request failed:', error);
        });
    }

    const handleKick = (userId) => {
      const confirmKick = window.confirm("Are you sure you want to kick this member?");
      if (confirmKick) {
        fetch(`http://localhost:3000/leagues/${leagueId}`, {
          credentials: 'include'
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch league details');
            }
            return response.json();
          })
          .then(league => {
            console.log(league.owner)
            getSelf().then(user => {
              if (league.owner === user._id) {
                kick(userId, leagueId);
              } else {
                alert("Only the owner can kick members.");
              }
            });


          })
          .catch(error => {
            console.error('Error fetching league details:', error);
            alert("Failed to fetch league details. Please try again later.");
          });
      }
    }

    return (
      <div>
        {members.map((member, index) => (
          <div key={index}>
            {index === 0 ? (
              <p>Owner: {member.user.username}</p>
            ) : (
              <div>
                <p>
                  Member: {member.user.username}
                  {isOwner ? (
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleKick(member.user._id)} style={{ marginLeft: '10px' }}>Kick</button>
                  ) : <></>}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }








  function Create() {
    const nav = useNavigate();

    const [leagueName, setLeagueName] = useState('');

    const goHome = () => {
      nav('/');
    };

    const login = async () => {
      nav('/login');
    };

    const register = async () => {
      nav('/register');
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!leagueName) return;
      try {
        addLeague({ name: leagueName });
        setLeagueName('');
      } catch (error) {
        console.error('Error adding league:', error);
      }
    };

    return (
      <div>
        <div className="d-flex h-100 text-center text-bg-dark">
          <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <header className="mb-auto">
              <div>
                <img src="./src/images/logo-large.png" alt="Valorantasy" width="300" className="float-md-start mb-0" />
                <nav className="nav nav-masthead justify-content-center float-md-end">
                <button className="btn btn-primary me-2" onClick={goHome}>
                    Home
                  </button>
                  <button className="btn btn-primary me-2" onClick={login}>
                    Login
                  </button>
                  <button className="btn btn-primary me-2" onClick={register}>
                    Sign Up
                  </button>
                  <button className="btn btn-danger" onClick={logout}>
                    Log Out
                  </button>
                </nav>
              </div>
            </header>

            <main className="px-3">
              <h1>Create a league</h1>
              <p className="lead">Please enter the name of the league you want to create!</p>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter league name"
                    value={leagueName}
                    onChange={(e) => setLeagueName(e.target.value)}
                  />
                  <button className="btn btn-outline-secondary" type="submit">
                    Create League
                  </button>
                </div>
              </form>
            </main>

            <footer className="mt-auto text-white-50">
              <p>Can't create a league? Please sign in to access feature.</p>
            </footer>
          </div>
        </div>
      </div>
    );
  }





  function Home() {
    const nav = useNavigate();



    const create = () => {
      nav('/createLeague');
    };

    const login = () => {

      nav('/login');
    };

    const register = () => {
      nav('/register');
    };

    const studentInfo = () => {
      alert("SE/ComS319 Construction of User Interfaces 05/08 Spring 2024\n Christian Ordaz: cordaz@iastate.edu \n Phu Nguyen: pnguyen2@iastate.edu \n Dr. Abraham N. Aldaco Gastelum \n Dr. Ali Jannesari")
    }


    return (
      <div>
        <div className="d-flex h-100 text-center text-bg-dark">
          <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <header className="mb-auto">
              <div>
                <img src="./src/images/logo-large.png" alt="Valorantasy" width="300" className="float-md-start mb-0" />
                <nav className="nav nav-masthead justify-content-center float-md-end">
                <button className="btn btn-primary me-2" onClick={studentInfo}>
                    Student Info
                  </button>
                  <button className="btn btn-primary me-2" onClick={login}>
                    Login
                  </button>
                  <button className="btn btn-primary me-2" onClick={register}>
                    Sign Up
                  </button>
                  <button className="btn btn-danger" onClick={logout}>
                    Log Out
                  </button>
                </nav>
              </div>
            </header>

            <main className="px-3">
              <h1>League Page.</h1>
              <p className="lead">
                View all the leagues that are available to you. From here, you can create and join a league, make sure to not
                miss the draft date!
              </p>
              <p className="lead">
                <a href="#" className="btn btn-lg btn-light fw-bold border-white bg-white" onClick={create} style={{ marginRight: '10px' }}>
                  Create League
                </a>
              </p>
            </main>

            <footer className="mt-auto text-white-50">
              <p>Nothing showing up? Please log in or sign up to show leagues.</p>
            </footer>
          </div>
        </div>

        <div className="my-3 p-3 bg-body rounded shadow-sm">
          <h6 className="border-bottom pb-2 mb-0">Leagues</h6>
          {leagues.map((league, index) => (
            <div key={index}>
              <ShowLeague league={league} />
              <h6 className="border-bottom pb-2 mb-0">
                <ShowMembers leagueId={league._id} />
              </h6>
            </div>
          ))}
        </div>
      </div>
    );
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
          credentials: 'include'
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage);
        }




        nav('/')
        window.location.reload();

      } catch (error) {
        console.error('Sign up failed:', error.message);
        alert("Username already taken.")

      }
    }


    return (
      <div>
        <main className="form-signin w-25 m-auto">
          <form>
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
            <Link to="/login"><button className="btn btn-primary w-100 py-2" type="submit" >Sign in</button></Link>

          </form>
        </main>

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
          credentials: 'include'
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage);
        }



        nav('/'); // Navigate to the home page
        window.location.reload();
      } catch (error) {
        console.error('Login failed:', error.message);
        alert("Username or password is incorrect.")
      }

    };



    return (
      <div>
        <link href="sign-in.css" rel="stylesheet" />
        <main className="form-signin w-25 m-auto">
          <form>
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
        <Route path="/" element={<Home />} />
        <Route path="/createLeague" element={<Create />} />
      </Routes>
    </Router>
  )
}

export default Main
