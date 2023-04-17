//read
/* fetch("http://localhost:3000/todos")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    }); */

export const APIs = (() => {
  const createTodo = (newTodo) => {
    return fetch('http://localhost:3000/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    }).then((res) => res.json());
  };

  const deleteTodo = (id) => {
    return fetch('http://localhost:3000/todos/' + id, {
      method: 'DELETE',
    }).then((res) => res.json());
  };

  const getTodos = () => {
    return fetch('http://localhost:3000/todos').then((res) => res.json());
  };

  const updateTodo = (id, update) => {
    return fetch('http://localhost:3000/todos/' + id, {
      method: 'PUT',
      body: JSON.stringify(update),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
  };
  return { createTodo, deleteTodo, getTodos, updateTodo };
})();
