// using constructor pattern

    // class Todos{
    //     todos = []
    //    constructor(){}
    //    getTodos(){
    //     return this.todos;
    //    }
    //    addTodo(todo){
    //     this.todos.push(todo);
    //    }
    // }

// const store = new Todos();
// console.log(store.getTodos());

// using singleton pattern

let todos = [];
let instance = null;

class Todos {
  constructor() {
    if (instance !== null) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getTodos() {
    return todos;
  }

  addTodo(todo) {
    todos.push(createTodo(todo));
  }

  clearTodos() {
    todos = [];
  }
}

// const Todos2 = {
//     getTodos() {
//         return todos;
//       },
    
//       addTodo(todo) {
//         todos.push(todo);
//       },
    
//       clearTodos() {
//         todos = [];
//       },
// }

// factory pattern

let currentTodoId=1;

function createTodo(todoText){
    return {
        text: todoText,
        id: currentTodoId++,
        deleteSelf(id){
          console.log(currentTodoId)
          console.log(id,'From id');
            const index = todos.findIndex(item=> item.id === id)
            todos.splice(index,1);
        }
        
    }
}


// const singletonInstance = Todos2;
const singletonInstance = new Todos();
Object.freeze(singletonInstance);

export default singletonInstance;
