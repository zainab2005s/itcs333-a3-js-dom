document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#todo-form');
  const input = document.querySelector('#todo-input');
  const todoList = document.querySelector('#todo-list');
  const errorMsg = document.querySelector('#error-msg');
  const counter = document.querySelector('#counter');

  const filterAll = document.querySelector('#filter-all');
  const filterActive = document.querySelector('#filter-active');
  const filterDone = document.querySelector('#filter-done');

  let currentFilter = 'all';

  function updateCounter() {
    if (!counter) return;
    const activeCount = todoList.querySelectorAll('li:not(.completed)').length;
    counter.textContent = `${activeCount} item${activeCount === 1 ? '' : 's'} left`;
  }

  function applyFilter() {
    const items = todoList.querySelectorAll('li');
    items.forEach((li) => {
      const isCompleted = li.classList.contains('completed');
      if (currentFilter === 'all') {
        li.style.display = '';
      } else if (currentFilter === 'active') {
        li.style.display = isCompleted ? 'none' : '';
      } else if (currentFilter === 'done') {
        li.style.display = isCompleted ? '' : 'none';
      }
    });
  }

  function setActiveFilter(selectedBtn, filterName) {
    currentFilter = filterName;
    [filterAll, filterActive, filterDone].forEach((btn) => {
      if (btn) btn.classList.remove('active');
    });
    if (selectedBtn) selectedBtn.classList.add('active');
    applyFilter();
  }

  function addItem(text) {
    const trimmed = text.trim();
    if (!trimmed) {
      if (errorMsg) errorMsg.hidden = false;
      return;
    }

    if (errorMsg) errorMsg.hidden = true;

    const li = document.createElement('li');
    
    const textSpan = document.createElement('span');
    textSpan.className = 'item-text';
    textSpan.textContent = trimmed;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';

    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    input.value = '';
    applyFilter();
    updateCounter();
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      addItem(input.value);
    });
  }

  if (input) {
    input.addEventListener('input', () => {
      if (errorMsg) errorMsg.hidden = true;
    });
  }

  if (todoList) {
    todoList.addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('delete-btn')) {
        const li = target.closest('li');
        if (li) {
          li.remove();
          updateCounter();
        }
        return;
      }

      const li = target.closest('li');
      if (li && todoList.contains(li)) {
        li.classList.toggle('completed');
        applyFilter();
        updateCounter();
      }
    });
  }

  if (filterAll) filterAll.addEventListener('click', () => setActiveFilter(filterAll, 'all'));
  if (filterActive) filterActive.addEventListener('click', () => setActiveFilter(filterActive, 'active'));
  if (filterDone) filterDone.addEventListener('click', () => setActiveFilter(filterDone, 'done'));

  updateCounter();
});