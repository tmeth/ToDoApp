import { useState } from 'react'
import './ToDoList.css'

const ToDoApp = () =>{
  // the main component that manages the entire list (and state) 
  const [task, setTask] = useState([]) //array of tasks
  const [inputValue, setInputValue] = useState('') //current input value

  //false until user presses submit button
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setInputValue(e.target.value);
  
  //when click remove button
  const handleRemove=(taskText)=>
    setTask(task.filter(tasks=>tasks!=taskText)) //remove task
   
  //when submit form
  function handleSubmit(e) {
    e.preventDefault(); 
    setSubmitted(true);
    //add the new task to the list and clear the input. 
    if (inputValue.trim()) { // Prevents adding empty tasks
      setTask([...task, inputValue]); // Add new task
      setInputValue(''); // Clear input field
  }
}
  return (
    <>
      <header className='header'><h1>To Do App</h1></header>
      <form className='form' onSubmit={handleSubmit}>
      <input className='input-field' value={inputValue} onChange={handleChange} />
      <button className='add-button' type="submit">Submit</button>

      {task.length === 0 ? <p>No Items Added</p> : null} 

      <div className='task-list'>
      {submitted && task.length > 0 && task.map((task, index) => (
      <ToDoItem key={index} taskText={task} removeFunction={handleRemove} />
    ))}</div>

    </form>
    </>
  )
}
const ToDoItem=({taskText, removeFunction})=>{
  //a reusable component to display each task 
  return(
    <>
    <p className='task-item'>{taskText}</p>
    <button className="remove-button" onClick={()=>removeFunction(taskText)}>Remove</button>
    </>
  )
}
function App() {
  
  return(
    <div className='container'>
    <ToDoApp />
    </div>
  )

}

export default App