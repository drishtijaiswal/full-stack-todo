import React from 'react'
import { NavLink } from 'react-router-dom'
import { isUserLoggedIn, logout } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'

const HeaderComponent = () => {

    const isAuth = isUserLoggedIn();

    const navigator = useNavigate();

    function handleLogout() {
        logout();
        navigator("/login");
    }
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    {/* Left side links */}
                    <div className="navbar-nav me-auto">
                        <NavLink className="navbar-brand" to="http://localhost:3000"> Todo Management Application</NavLink>
                        {
                            isAuth && <NavLink className="navbar-brand" to="/todos"> Todos</NavLink>
                        }
                    </div>
                    {/* Right side links */}
                    <div className="navbar-nav ms-auto">
                        {
                            !isAuth && <NavLink className="nav-link" to="/register">Register</NavLink>
                        }
                        {
                            !isAuth && <NavLink className="nav-link" to="/login">Login</NavLink>
                        }
                        {
                            isAuth && <NavLink className="nav-link" to="/login" onClick={handleLogout}>Logout</NavLink>
                        }
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent