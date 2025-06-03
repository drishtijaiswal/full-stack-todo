import React, { useState } from 'react'
import { loginAPICall, saveLoggedInUser, storeToken } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'


function LoginComponent() {
    const [username, setUsernameOrEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigator = useNavigate();

    async function handleLoginForm(event) {

        event.preventDefault();

        await loginAPICall(username, password).then((response) => {
            console.log(response.data)
            //Basic Auth token 
            //const token = 'Basic ' + window.btoa(username + ":" + password)
            const token = 'Bearer ' + response.data.accessToken
            const role = response.data.role
            storeToken(token)
            saveLoggedInUser(username, role)
            navigator("/todos")

            window.location.reload(false)
        }).catch(error => {
            if (error.response) {
                console.error('Error status:', error.response.status);
                console.error('Error data:', error.response.data);
            } else {
                console.error('Error message:', error.message);
            }
        })
    }
    return (
        <div className='container'>
            <br /><br />
            <div>
                <div className='col-md-6 offset-md-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <h2 className='text-center'> User Login Form</h2>
                        </div>
                        <div className='card-body'>
                            <form>
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>Email</label>
                                    <div className='col-md-9'>
                                        <input
                                            type='text'
                                            name='name'
                                            className='form-control'
                                            placeholder='Enter Username or Email'
                                            value={username}
                                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>Password</label>
                                    <div className='col-md-9'>
                                        <input
                                            type='password'
                                            name='username'
                                            className='form-control'
                                            placeholder='Enter Password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className='form-group mb-3 d-flex align-items-center gap-2'>
                                    <button className='btn btn-primary' onClick={(event) => handleLoginForm(event)}>Submit</button>
                                    <span>Not Registered?</span>
                                    <NavLink className="btn btn-link p-0" to="/register">Register here</NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LoginComponent