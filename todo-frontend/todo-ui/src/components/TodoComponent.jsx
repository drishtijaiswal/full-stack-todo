import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { addTodo, getTodo, updateTodo } from '../services/TodoService';

function TodoComponent() {

    //useParams() is a react router hook to access dynamic URL params from the URL like id e.g. '/edit-employee/42' then id=='42'
    const {id} = useParams();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState(false)
    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getTodo(id).then((response) => {
                const todo = response.data;
                setTitle(todo.title);
                setDescription(todo.description);
                setCompleted(todo.completed);
            }).catch((error) => {
                console.error('Error fetching todo:', error);
            });
        }
    }, [id]);
    
    function saveOrUpdateTodo(e){
        e.preventDefault();
        
        const todo = {title, description, completed}
        console.log(todo)
        if(id){
            updateTodo(id,todo).then((response)=> {
                console.log(response.data);
                navigator('/todos')
            }).catch(error => {
                console.error(error);
            })
        } else {
            addTodo(todo).then((response) => {
            console.log(response.data);
            navigator('/todos')
            }).catch(error => {
                console.error(error);
            })
        }
    }
    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Todo</h2>
        }
        else{
            return <h2 className='text-center'>Add Todo</h2>
        }

    }

    return (
            <div className='container'>
        <br></br>
        <div className='row'>
            <div className='card col-md-6 mx-auto'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Title</label>
                            <input 
                                type='text' 
                                className='form-control'
                                placeholder='Enter Todo Title'
                                name='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Descrption</label>
                            <input 
                                type='text' 
                                className='form-control'
                                placeholder='Enter Todo Description'
                                name='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Todo Completed:</label>
                            <select
                                className='form-control'
                                value={completed}
                                onChange={(e)=> setCompleted(e.target.value)}
                            >
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </select>
                        </div>
                        
                        <button className='btn btn-success' onClick={saveOrUpdateTodo}>Submit</button>
                    </form>
                </div>             
            </div>
        </div>      
    </div>
    )
}

export default TodoComponent