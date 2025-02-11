import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Todolist from '../components/TodoList/Todolist';
import singletonInstance from './utils/todos';

function App() {
  const [jokes,setJokes] = useState([]);
  const [todos,setTodos] = useState(singletonInstance.getTodos());
  console.log(todos);
  // cannot add because object is freez
  // singletonInstance.something="23"

  useEffect(()=>{
    axios.get('/api/jokes')
    .then(res=>{
      setJokes(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  console.log(jokes);

  return (
    <>
      <h2>ALL JOKES</h2>
      <p>Jokes: {jokes.length}</p>
      {
        jokes.map((joke,index)=>{
          return <div key={index}>
            <h3>{joke.setup}</h3>
            <p>{joke.punchline}</p>
          </div>
        })
      }


      <h2>Todos Section</h2>
      <div className='todo-container'>
        <div className='todos'>
          <Todolist todos={todos} setTodos={setTodos} store={singletonInstance} />
        </div>
        <div className='todos'>
          <Todolist todos={todos} setTodos={setTodos} store={singletonInstance} />
        </div>
      </div>
    </>
  )
}

export default App
