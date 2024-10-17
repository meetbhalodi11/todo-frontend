import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaRegCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa"
import { IoMdAddCircleOutline } from "react-icons/io";

const Home = () => {
    const [todoList, setTodoList] = useState([])
    const [task, setTask] = useState('');
    const navigate = useNavigate();
    const notify = (notification) => toast(notification);

    const userName = localStorage.getItem('userName')

    const getTasks = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
            }
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-tasks`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setTodoList(response.data);
        } catch (error) {
            notify(error.message)
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        getTasks();
    }, [getTasks]);


    const handleRemove = (todo) => {
        const token = localStorage.getItem('token');
        axios.delete(`${import.meta.env.VITE_API_URL}/delete-task/${todo._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                getTasks();
                notify("Task deleted successfully")
            })
            .catch(err => notify(err.message))
    }

    const handleTodoStatus = (todo) => {
        const token = localStorage.getItem('token');
        axios.put(
            `${import.meta.env.VITE_API_URL}/update-task-status/${todo._id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
            .then(() => {
                getTasks();
            })
            .catch(err => notify(err.message))
    }

    const handleAddTask = () => {
        const token = localStorage.getItem('token');
        axios.post(`${import.meta.env.VITE_API_URL}/add-task`, { task }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setTask('');
                getTasks();
                notify("Task added successfully")
            })
            .catch(err => notify(err.message))
    }

    const handleEdit = (todo) => {
        const token = localStorage.getItem('token');
        const newTask = prompt('Edit your task:', todo.task);
        if (newTask) {
            axios.put(`${import.meta.env.VITE_API_URL}/update-task/${todo._id}`, { task: newTask }, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(() => {
                    getTasks();
                    notify("Task edited successfully")
                })
                .catch(error => {
                    notify(error.message)
                });
        }
    };

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>

            <div className="w-[95%] md:w-96 max-w-full p-8 pr-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-[400px] overflow-auto flex flex-col">
                <div className="flex items-center mb-4">
                    <svg className="h-8 w-8 text-indigo-500 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                    <h4 className="font-semibold ml-3 text-lg dark:text-white">{userName}{"'s"} tasks</h4>
                </div>

                <div className='overflow-auto flex flex-col h-full pr-4 mb-4'>
                    {
                        todoList?.length ?
                            todoList.map((todo, index) => (
                                <div key={index}>
                                    <div className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => handleTodoStatus(todo)}>

                                        {
                                            todo.completed ?
                                                <FaCheckCircle className='text-green-400' style={{ 'fontSize': '18px' }} /> :
                                                <FaRegCircle className='text-slate-400 dark:text-white' style={{ 'fontSize': '18px' }} />
                                        }

                                        <span className={`ml-3 text-sm w-full dark:text-white ${todo.completed ? 'line-through' : ''}`}>
                                            {todo.task}
                                        </span>

                                        <FaEdit className='text-slate-700 md:hidden group-hover:block mr-2 dark:text-white' style={{ 'fontSize': '18px' }} onClick={(e) => { e.stopPropagation(); handleEdit(todo) }} />
                                        <MdDeleteForever className='text-slate-700 md:hidden group-hover:block dark:text-white' style={{ 'fontSize': '20px' }} onClick={(e) => { e.stopPropagation(); handleRemove(todo) }} />

                                    </div>
                                </div>
                            )) :

                            <React.Fragment>
                                <div className='ml-2 text-gray-500'>No task added</div>
                            </React.Fragment>
                    }
                </div>


                <button className="flex items-center w-full h-8 mt-2 text-sm font-medium rounded">
                    <input className="flex-grow ml-2 h-8 bg-transparent border-1/2 rounded-md focus:outline-none font-medium dark:text-white" type="text" placeholder="Add task..." value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { handleAddTask(); } }} required />
                    <IoMdAddCircleOutline className='ml-2 text-gray-700 dark:text-white' style={{ 'fontSize': '24px' }} onClick={() => { handleAddTask(); }} />
                </button>
            </div>

            {/* Create task */}
            {/* <div>
                <input
                    type='text'
                    placeholder='Enter task...'
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button type='submit' onClick={handleAddTask}>Add</button>
            </div> */}

            {/* List taks */}
            {/* {
                todoList?.length ?
                    todoList.map((todo, index) => (
                        <div className='task flex flex-row' key={index} onClick={() => handleTodoStatus(todo)}>
                            <div>
                                <div>{todo.completed ? 'done' : 'todo'} | </div>
                                <div>{todo.task}</div>
                            </div>
                            <div className='remove-task' onClick={() => handleRemove(todo)}>
                                <FaTrash />
                            </div>
                        </div>
                    )) :
                    <React.Fragment>
                        <div>No task added</div>
                    </React.Fragment>
            } */}
            {/* Logout */}
            {/* <button onClick={handleLogout}>Logout</button> */}
        </div>

    )
}

export default Home