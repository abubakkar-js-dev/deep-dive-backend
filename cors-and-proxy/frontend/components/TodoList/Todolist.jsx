import "./Todolist.css";
// import Todos from '../../src/utils/todos';

// eslint-disable-next-line react/prop-types
const Todolist = ({ todos = [], setTodos, store = {} }) => {
  console.log(todos, "From todos");

  const hanleAddTodo = () => {
    const newtodo = `New todo ${Math.floor(Math.random() * 200)}`;
    console.log(newtodo);
    setTodos([...todos, newtodo]);
    store.addTodo(newtodo);
  };
  return (
    <div style={{display: 'flex', flexDirection: 'column',textAlign: 'center'}}>
      <ul className="todo-list">
      {todos.map((todo, index) => (
        <li key={index} className="todo">
          {todo}{" "}
        </li>
      ))}
      </ul>


      <button
        onClick={hanleAddTodo}
        className="add-todo"
        style={{
          padding: "12px 28px",
          backgroundColor: "Highlight",
          borderRadius: "12px",
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

export default Todolist;
