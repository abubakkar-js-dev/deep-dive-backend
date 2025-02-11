import "./Todolist.css";
// import Todos from '../../src/utils/todos';

// eslint-disable-next-line react/prop-types
const Todolist = ({ todos = [], setTodos, store = {} }) => {
  console.log(todos, "From todos");

  const hanleAddTodo = () => {
    const newtodo = `New todo ${Math.floor(Math.random() * 200)}`;
    console.log(newtodo);
    store.addTodo(newtodo);
    setTodos([...store.getTodos()]);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", textAlign: "center", border: '1px solid Highlight',padding: '14px',borderRadius: '24px' }}
    >
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>
            <span className="todo">{todo.text}</span>
            <span
              onClick={() => {
                todo.deleteSelf(todo.id);
                setTodos([...store.getTodos()]);
              }}
              style={{ marginLeft: "12px" }}
              className="todo todo-delete"
            >
              X
            </span>
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
