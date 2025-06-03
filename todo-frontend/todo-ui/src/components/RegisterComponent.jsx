import React, { useState } from 'react'
import { registerAPICall } from '../services/AuthService'
import { NavLink } from 'react-router-dom'

function RegisterComponent() {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleRegistrationForm(event) {
        event.preventDefault();
        const register = { name, username, email, password }

        registerAPICall(register).then((response) => {
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
    return (
        <div className='container'>
            <br /><br />
            <div>
                <div className='col-md-6 offset-md-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <h2 className='text-center'> User Registration Form</h2>
                        </div>
                        <div className='card-body'>
                            <form>
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>Name</label>
                                    <div className='col-md-9'>
                                        <input
                                            type='text'
                                            name='name'
                                            className='form-control'
                                            placeholder='Enter Name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>Username</label>
                                    <div className='col-md-9'>
                                        <input
                                            type='text'
                                            name='username'
                                            className='form-control'
                                            placeholder='Enter Username'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>Email</label>
                                    <div className='col-md-9'>
                                        <input
                                            type='text'
                                            name='email'
                                            className='form-control'
                                            placeholder='Enter Email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>Password</label>
                                    <div className='col-md-9'>
                                        <input
                                            type='text'
                                            name='password'
                                            className='form-control'
                                            placeholder='Enter Password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className='form-group mb-3 d-flex align-items-center gap-2'>
                                    <button className='btn btn-primary' onClick={(event) => handleRegistrationForm(event)}>Submit</button>
                                    <span>Already Registered?</span>
                                    <NavLink className="btn btn-link p-0" to="/login">Login here</NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RegisterComponent