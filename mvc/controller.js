import { Model } from './model.js';
import { View } from './view.js';
export const Controller = ((view, model) => {
  const state = new model.State();
  const init = () => {
    model.getTodos().then((todos) => {
      todos.reverse();
      state.todos = todos;
    });
  };

  const handleSubmit = () => {
    view.submitBtnEl.addEventListener('click', (event) => {
      /* 
                1. read the value from input
                2. post request
                3. update view
            */
      const inputValue = view.inputEl.value;
      model
        .createTodo({ content: inputValue, markComplete: false })
        .then((data) => {
          state.todos = [data, ...state.todos];
          view.clearInput();
        });
    });
  };

  const handleUpdate = () => {
    const updateTodo = (event) => {
      if (event.target.className === 'edit-btn') {
        const id = event.target.id;
        let element = document.getElementById(id);
        if (element.classList.contains('edit-btn')) {
          element.classList.remove('edit-btn');
          element.classList.add('editing');
        } else {
          element.classList.remove('editing');
          element.classList.add('edit-btn');
        }
        const todoContent = event.target.parentNode.querySelector('span');
        const oldContent = todoContent.textContent;
        todoContent.innerHTML = `<input type='text' value='${oldContent}' />`;
        const inputValue = todoContent.querySelector('input');
        inputValue.focus();
        inputValue.addEventListener('blur', () => {
          let newContent = inputValue.value;
          console.log(newContent);
          if (newContent && newContent !== '') {
            const currentTodo = state.todos.find((todo) => todo.id === +id);
            currentTodo.content = newContent;
            model.updateTodo(+id, currentTodo).then((data) => {
              console.log('updating', data);
            });
          } else {
            todoContent.innerHTML = oldContent;
          }
        });
      }
    };
    view.todolistEl.addEventListener('click', updateTodo);
    view.completeListEl.addEventListener('click', updateTodo);
  };

  const handleDelete = () => {
    //event bubbling
    /* 
            1. get id
            2. make delete request
            3. update view, remove
        */
    const deleteTodo = (event) => {
      if (event.target.className === 'delete-btn') {
        const id = event.target.id;
        console.log('delete id', typeof id);
        model.deleteTodo(+id).then((data) => {
          state.todos = state.todos.filter((todo) => todo.id !== +id);
          console.log('delete: ', data);
        });
      }
    };
    view.todolistEl.addEventListener('click', deleteTodo);
    view.completeListEl.addEventListener('click', deleteTodo);
  };

  const handleMove = () => {
    const moveTodo = (event) => {
      if (
        event.target.className === 'right-arrow-btn' ||
        event.target.className === 'left-arrow-btn'
      ) {
        const id = event.target.id;
        const currentTodo = state.todos.find((todo) => todo.id === +id);
        console.log(currentTodo.content);
        currentTodo.content = currentTodo.content;
        currentTodo.markComplete = !currentTodo.markComplete; //toggled pending or complete todos
        model.updateTodo(+id, currentTodo).then((data) => {
          //state.todos = state.todos.filter((todo) => todo.id !== +id);
          console.log('move: ', data);
        });
      }
    };
    view.todolistEl.addEventListener('click', moveTodo);
    view.completeListEl.addEventListener('click', moveTodo);
  };

  const bootstrap = () => {
    init();
    handleSubmit();
    handleDelete();
    handleUpdate();
    handleMove();
    state.subscribe(() => {
      view.renderTodos(state.todos);
    });
  };
  return {
    bootstrap,
  };
})(View, Model); //ViewModel
