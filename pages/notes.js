import React, { useState, useEffect } from 'react';
import { auth, database } from '../firebaseConfig'; // Adjust the path as necessary
import {signOut , onAuthStateChanged } from 'firebase/auth';
import Navbar from './Navbar';
import { useRouter } from 'next/router';
import { ref, set, push, onValue, remove, update } from 'firebase/database';

export default function Notes() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  // //fetch tasks
  // useEffect(() => {
  //   const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  //   setTasks(storedTasks);
  // }, []);

  // //store tasks to local storage on change of tasks array
  // useEffect(() => {
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }, [tasks]);

  // set user email
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, set user email
        setUserEmail(user.email);
      } else {
        // User is signed out, reset user email to empty
        setUserEmail('');
        router.push('signin');
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  // handle sign out
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('User signed out successfully');
    }).catch((error) => {
      // An error happened.
      console.error('Sign out error', error);
    });
  };

  // Fetch tasks from Firebase Realtime Database and load tasks array
  useEffect(() => {

    const uid = auth.currentUser.uid;
    const userTasksRef = ref(database, `users/${uid}/tasks`);
    onValue(userTasksRef, (snapshot) => {
      const data = snapshot.val();
      const loadedTasks = [];
      for (const key in data) {
        loadedTasks.push({ id: key, ...data[key] });
      }
      setTasks(loadedTasks);
    });
  }, []);

  // const addTask = () => {
  //   if (!task) return;
  //   setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
  //   setTask('');
  // };
  // const deleteTask = (id) => {
  //   setTasks(tasks.filter(task => task.id !== id));
  // };

  // const toggleTask = (id) => {
  //   setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  // };

  const addTask = () => {
    if (!task) return;
    const uid = auth.currentUser.uid; 
    const newTaskRef = push(ref(database, `users/${uid}/tasks`));
    set(newTaskRef, { text: task, completed: false });
    setTask('');
  };

  const deleteTask = (id) => {
    if (!auth.currentUser) return; // Guard clause to ensure user is signed in
    const uid = auth.currentUser.uid; // Get the currently signed-in user's UID
    remove(ref(database, `users/${uid}/tasks/${id}`)); // Adjust the path to include the user's UID and task ID
  };

  const toggleTask = (id) => {
    if (!auth.currentUser) return; // Guard clause to ensure user is signed in
    const uid = auth.currentUser.uid; // Get the currently signed-in user's UID

    const taskRef = ref(database, `users/${uid}/tasks/${id}`); 
    onValue(taskRef, (snapshot) => {
      const taskData = snapshot.val();
      update(taskRef, { completed: !taskData.completed });
    }, { onlyOnce: true });
  };

  

   // Calculate the number of tasks left (not completed)
   const tasksLeft = tasks.filter(task => !task.completed).length;

  return (

    <>
   <Navbar userEmail={userEmail} handleSignOut={handleSignOut} />

    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center my-8 text-gray-800">Elegant To-Do List</h1>
      
      
      <div className="text-center my-4">
        <span className="text-lg text-gray-700">{tasksLeft} Task{tasksLeft !== 1 ? 's' : ''} Left</span>
      </div>

      <div className="flex items-center mb-6 space-x-4">
        <input
          type="text"
          className="flex-grow shadow appearance-none border rounded-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-150 ease-in-out transform hover:-translate-y-1"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={`flex items-center justify-between bg-white shadow rounded-lg px-6 py-3 mb-3 transition duration-150 ease-in-out ${task.completed ? 'text-gray-400' : 'text-gray-700'}`}>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="form-checkbox rounded text-blue-500 mr-3 transition duration-150 ease-in-out"
              />
              <span className={`transition duration-150 ease-in-out ${task.completed ? 'line-through' : ''}`}>
                {task.text}
              </span>
            </div>
            <button onClick={() => deleteTask(task.id)} className="text-sm text-red-500 hover:text-red-600 transition duration-150 ease-in-out">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}