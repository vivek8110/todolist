import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [user, setUser] = useState({
    name: "", email: "", message: "", status: false
  })
  const [alluser, setAlluser] = useState([])

  const onchange = (e) => {
    e.preventDefault()

    setUser({
      ...user, [e.target.name]: e.target.value
    })
  }

  console.log(user);

  const submitHandler = (e) => {
    e.preventDefault()
    setAlluser([
      ...alluser, user
    ])
    setUser({
      name: "", email: "", message: "", status: false
    })

  }

  useEffect(() => {
    if (!alluser) {
      localStorage.setItem('users', JSON.stringify(...user))
    } else {
      localStorage.setItem('users', JSON.stringify(alluser))
    }
  })

  const updatestate = (singleuser) => {
    const updatedUser = { ...singleuser, status: !singleuser.status };

    setAlluser(alluser.map(user => user === singleuser ? updatedUser : user));


  }


  console.log("alluser is ", alluser);

  return (
    <div className="App">
      <div className="container">
        <div className="row">


          {/* form */}

          <div className="col-4 my-auto">
            <form onSubmit={submitHandler}>
              <div className="container custom-container">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" className="form-control" value={user.name} onChange={onchange} name='name' id="name" placeholder="Enter your first name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="text" className="form-control" value={user.email} onChange={onchange} name='email' id="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea className="form-control" value={user.message} onChange={onchange} id="message" name='message' rows={4} placeholder="Enter your message" defaultValue={""} />
                </div>
                <button type="submit" className="btn btn-primary my-3 mt-5">Submit</button>
              </div>
            </form>
          </div>

          {/* card */}
          <div className="col-8">
            <div className="row">
              {
                alluser.map((singleuser) => {
                  return (
                    <div className='col-lg-6'>
                      {
                        singleuser.status === true ? <div className="card m-auto" style={{ width: '18rem', background: "green", color: 'white' }}>
                          <div className="card-body">
                            <div className="text">
                              <h5 className="card-title">NAME:</h5>
                              <p>{singleuser.name}</p>
                            </div>
                            <div className="text">
                              <h5 className="card-title">EMAIL:</h5>
                              <p>{singleuser.email}</p>
                            </div>
                            <div className="text">
                              <h5 className="card-title">MESSAGE:</h5>
                              <p>{singleuser.message}</p>
                            </div>

                            <button onClick={() => updatestate(singleuser)} href="#" className="btn btn-light my-2 text-success">Go somewhere</button>

                          </div>
                        </div> : <div className="card m-auto" style={{ width: '18rem', background: "red", color: 'white' }}>
                          <div className="card-body">
                            <div className="text">
                              <h5 className="card-title">NAME:</h5>
                              <p>{singleuser.name}</p>
                            </div>
                            <div className="text">
                              <h5 className="card-title">EMAIL:</h5>
                              <p>{singleuser.email}</p>
                            </div>
                            <div className="text">
                              <h5 className="card-title">MESSAGE:</h5>
                              <p>{singleuser.message}</p>
                            </div>

                            <button onClick={() => updatestate(singleuser)} href="#" className="btn btn-light my-2 text-danger">Go somewhere</button>

                          </div>
                        </div>

                      }

                    </div>
                  )
                })
              }
            </div>

          </div>
        </div>
      </div>

    </div >
  );
}

export default App;
