import React, { useEffect, useState } from 'react'
import { completeTodo, deleteTodo, getAllTodos, incompleteTodo } from '../services/TodoService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { isAdminUser } from '../services/AuthService';

function ListTodoComponent() {

    const [todo, setTodo] = useState([]);
    const [todoId, setTodoToDelete] = useState(null)
    const navigator = useNavigate();

    const isAdmin = isAdminUser();


    useEffect(() => {
        listTodos();
    }, [])

    function listTodos() {
        getAllTodos().then((response) => {
            setTodo(response.data)
        }).catch(error => {
            console.error(error);
        })
    }
    function addNewTodo() {
        navigator('/addTodo')

    }
    function editTodo(id) {
        navigator(`/updateTodo/${id}`)
    }
    function handleDelete() {
        if (todoId) {
            deleteTodo(todoId).then(() => {
                listTodos();
                setTodoToDelete(null);
            })
        } else {
            setTodoToDelete(null);
        }
    }
    function handleComplete(id) {
        completeTodo(id).then(() => {
            listTodos();
        }).catch(error => {
            console.error(error);
        })
    }
    function handleIncomplete(id) {
        incompleteTodo(id).then(() => {
            listTodos();
        }).catch(error => {
            console.error(error);
        })
    }

    return (

        <div className='container-fluid px-4'>
            <h2 className='text-center'>List of ToDos</h2>
            {
                isAdmin && <button className="btn btn-primary mb-2" onClick={addNewTodo}>Add ToDo</button>
            }
            <div>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>ToDo Title</th>
                            <th>ToDo Description</th>
                            <th>ToDo Completed</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todo.map(todo =>
                                <tr key={todo.id}>
                                    <td>{todo.title}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.completed ? 'YES' : 'NO'}</td>
                                    <td>
                                        {
                                            isAdmin && <button className='btn btn-info' onClick={() => editTodo(todo.id)}>Update</button>
                                        }
                                        <button type="button" className="btn btn-success ms-2" onClick={() => handleComplete(todo.id)}>Complete</button>
                                        <button type="button" className="btn btn-secondary ms-2" onClick={() => handleIncomplete(todo.id)}>Incomplete</button>
                                        {
                                            isAdmin &&
                                            <button
                                                className='btn btn-danger ms-2'
                                                data-bs-toggle='modal'
                                                data-bs-target='#deleteConfirmationModal'
                                                onClick={() => setTodoToDelete(todo.id)}
                                            >Delete</button>
                                        }

                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="modal fade" id="deleteConfirmationModal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete ToDo</h5>
                                <button
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => setTodoToDelete(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete ToDo #{todoId} ?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>Delete</button>
                                <button className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={() => setTodoToDelete(null)}
                                >Cancel</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListTodoComponent