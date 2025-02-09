import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [jokes,setJokes] = useState([]);

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
    </>
  )
}

export default App
