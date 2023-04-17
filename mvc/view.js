/* 
    todos = [
        {
            id:1,
            content:"eat lunch"
        },
        {
            id:2,
            content:"eat breakfast"
        }
    ]

*/
export const View = (() => {
  const todolistEl = document.querySelector('.todo-list');
  const submitBtnEl = document.querySelector('.submit-btn');
  const inputEl = document.querySelector('.input');
  const completeListEl = document.querySelector('.complete-list');

  const renderTodos = (todos) => {
    let todosTemplate = '';
    let completeTemplate = '';

    todos.forEach((todo) => {
      const liTodoTemplate = `<li><span>${todo.content}</span>
              <button class="edit-btn" id="${todo.id}">
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"  aria-label="fontSize small">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
              </button>
              <button class="delete-btn" id="${todo.id}">
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" aria-label="fontSize small">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
              </button>
              <button class="right-arrow-btn" id="${todo.id}"> 
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIcon" aria-label="fontSize small">
                <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
              </button>
              </li>`;

      const liCompleteTemplate = `<li>
              <button class="left-arrow-btn" id="${todo.id}">
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" aria-label="fontSize small">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
              </button>
              <span>${todo.content}</span>
              <button class="edit-btn" id="${todo.id}">
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"  aria-label="fontSize small">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
              </button>
              <button class="delete-btn" id="${todo.id}">
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" aria-label="fontSize small">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
              </button>
              </li>`;

      if (todo.markComplete) {
        completeTemplate += liCompleteTemplate;
      } else {
        todosTemplate += liTodoTemplate;
      }
    });

    if (todos.length === 0 || todosTemplate === '') {
      todosTemplate = '<h4>no task to display!</h4>';
    }

    if (todos.length === 0 || completeTemplate === '') {
      completeTemplate = '<h4>no task to display!</h4>';
    }

    todolistEl.innerHTML = todosTemplate;
    completeListEl.innerHTML = completeTemplate;
  };

  const clearInput = () => {
    inputEl.value = '';
  };

  return {
    renderTodos,
    submitBtnEl,
    inputEl,
    clearInput,
    todolistEl,
    completeListEl,
  };
})();
