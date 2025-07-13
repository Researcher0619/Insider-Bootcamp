document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('taskForm');
  const titleInput = document.getElementById('title');
  const descriptionInput = document.getElementById('description');
  const taskList = document.getElementById('taskList');
  const errorMessage = document.getElementById('errorMessage');
  const showCompletedBtn = document.getElementById('showCompletedBtn');
  const sortPriorityBtn = document.getElementById('sortPriorityBtn');

  let tasks = [];

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    try {
      const title = titleInput.value.trim();
      const description = descriptionInput.value.trim();
      const priority = document.querySelector("input[name='priority']:checked");

      if (!title) {
        errorMessage.textContent = 'Başlık boş bırakılamaz.';
        return;
      }

      if (!priority) {
        errorMessage.textContent = 'Lütfen bir öncelik seçin.';
        return;
      }

      const task = {
        id: Date.now(),
        title,
        description,
        priority: priority.value,
        completed: false,
      };

      tasks.push(task);
      renderTasks(tasks);
      taskForm.reset();
      errorMessage.textContent = '';
    } catch (error) {
      errorMessage.textContent = 'Beklenmedik bir hata oluştu.';
      console.error('Hata:', error);
    }
  });

  taskList.addEventListener('click', (e) => {
    e.stopPropagation();
    const id = e.target.dataset.id;
    if (e.target.classList.contains('complete-btn')) {
      const task = tasks.find((t) => t.id == id);
      task.completed = !task.completed;
      renderTasks(tasks);
    } else if (e.target.classList.contains('delete-btn')) {
      tasks = tasks.filter((t) => t.id != id);
      renderTasks(tasks);
    }
  });

  showCompletedBtn.addEventListener('click', () => {
    const filtered = tasks.filter((task) => task.completed);
    renderTasks(filtered);
  });

  sortPriorityBtn.addEventListener('click', () => {
    const priorityOrder = { Düşük: 1, Orta: 2, Yüksek: 3 };
    tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    renderTasks(tasks);
  });

  function renderTasks(taskArray) {
    taskList.innerHTML = '';
    taskArray.forEach((task) => {
      const li = document.createElement('li');
      li.className = task.completed ? 'completed' : '';
      li.innerHTML = `
        <strong>${task.title}</strong><br />
        <small>${task.description}</small><br />
        <em>Öncelik: ${task.priority}</em>
        <div class="task-actions">
          <button class="complete-btn" data-id="${task.id}">Tamamla</button>
          <button class="delete-btn" data-id="${task.id}">Sil</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  }
});
