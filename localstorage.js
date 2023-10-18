const getTodolistFromLocalStorage = () => {
    const todoListJSON = localStorage.getItem('todo');
  
    if (todoListJSON) {
      try {
        return JSON.parse(todoListJSON);
      } catch (error) {
        console.error('Error parsing JSON data from local storage:', error);
      }
    }
  
    return [];
  }
  
  
  const addTodolistToLocalstorage = (todoList) => {
    localStorage.setItem('todo', JSON.stringify(todoList));
  }
  
  const updateCompletedTaskAndAddToLocalstorage = (todoList, taskId) => {
    addTodolistToLocalstorage(todoList);
  }
  
  export { addTodolistToLocalstorage, getTodolistFromLocalStorage, updateCompletedTaskAndAddToLocalstorage };
  