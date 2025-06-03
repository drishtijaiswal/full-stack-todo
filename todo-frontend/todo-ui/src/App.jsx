import './App.css'
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent'
import ListTodoComponent from './components/ListTodoComponent'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import TodoComponent from './components/TodoComponent';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import { isUserLoggedIn } from './services/AuthService';

function App() {

  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn();
    if (isAuth) {
      return children;
    }
    {/* Corresponds to localhost:3000 which is the LoginComponent */ }
    return <Navigate to="/" />
  }

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route>
            {/* // http://localhost:3000 */}
            <Route path='/' element={<LoginComponent />}></Route>
            {/* // http://localhost:3000/todos */}
            <Route path='/todos' element={
              <AuthenticatedRoute>
                <ListTodoComponent />
              </AuthenticatedRoute>
            }></Route>
            {/* // http://localhost:3000/addTodo */}
            <Route path='/addTodo' element={
              <AuthenticatedRoute>
                <TodoComponent />
              </AuthenticatedRoute>
            }></Route>
            {/* // http://localhost:3000/updateTodo/123 */}
            <Route path='/updateTodo/:id' element={
              <AuthenticatedRoute>
                <TodoComponent />
              </AuthenticatedRoute>
            }></Route>
            {/* http://localhost:3000/register */}
            <Route path='/register' element={<RegisterComponent />}></Route>
            {/* http://localhost:3000/login */}
            <Route path='/login' element={<LoginComponent />}></Route>

          </Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
