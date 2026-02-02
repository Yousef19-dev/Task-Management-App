let input = document.getElementById('task-inp');
let add = document.getElementById('add-btn');
let notcomplt = document.getElementById('Task-not-complt');
let complt = document.getElementById('Task-complt');
let taskArr = JSON.parse(localStorage.getItem('tasks')) || [];
let taskArrComplt = JSON.parse(localStorage.getItem('taskscomplt')) || [];

function showTask() {
  let htmlString = '';
  taskArr.forEach((task, index) => {
    htmlString += `
    <div class="Pending" id="task-${index}">
      <button class="text-dark btn btn-success checkBtn" onclick="isChecked(${index})">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5" data--h-bstatus="0OBSERVED"/></svg>
      </button>
      <div>${task}</div>
      <button onclick="deleteTask(${index})" class="text-dark btn btn-danger">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6" data--h-bstatus="0OBSERVED"/><path d="M14 11v6" data--h-bstatus="0OBSERVED"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" data--h-bstatus="0OBSERVED"/><path d="M3 6h18" data--h-bstatus="0OBSERVED"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" data--h-bstatus="0OBSERVED"/></svg>
      </button>
    </div>
    `;
  });
  notcomplt.innerHTML = htmlString;
}

function showTaskChecked() {
  let htmlString = '';
  taskArrComplt.forEach((task, index) => {
    htmlString += `
    <div class="complt-task-item" id="complt-${index}">
      <div>${task}</div>
      <button onclick="deleteCompltTask(${index})" class="text-dark btn btn-danger">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
      </button>
    </div>
    `;
  });
  complt.innerHTML = htmlString;
}

function renderAll() {
  showTask();
  showTaskChecked();
}

add.onclick = () => {
  if (!input.value) {
    alert('ADD A TASK');
  } else {
    taskArr.push(input.value);
    localStorage.setItem('tasks', JSON.stringify(taskArr));
    showTask();
    const list = document.getElementById('Task-not-complt');
    const newTask = list.lastElementChild;
    if (newTask) {
      gsap.from(newTask, {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: 'back.out(1.7)',
      });
    }
    input.value = '';
  }
};

function deleteTask(index) {
  const taskRow = document.getElementById(`task-${index}`);
  gsap.to(taskRow, {
    x: -800,
    duration: 0.4,
    ease: 'power2.in',
    onComplete: () => {
      taskArr.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(taskArr));
      showTask();
    },
  });
}
function isChecked(index) {
  const activeTaskRow = document.getElementById(`task-${index}`);
  const taskText = taskArr[index];
  const compltList = document.getElementById('Task-complt');

  const ghostTask = document.createElement('div');
  ghostTask.className = 'complt-task-item';
  ghostTask.innerHTML = `
    <div>${taskText}</div>
    <button class="text-dark btn btn-danger" disabled>
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
    </button>
  `;

  compltList.appendChild(ghostTask);
  gsap.set(ghostTask, { x: -800, opacity: 1 });

  const tl = gsap.timeline({
    onComplete: () => {
      let task = taskArr[index];
      taskArrComplt.push(task);
      taskArr.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(taskArr));
      localStorage.setItem('taskscomplt', JSON.stringify(taskArrComplt));
      renderAll();
    },
  });

  tl.to(activeTaskRow, {
    x: 800,
    opacity: 1,
    duration: 0.4,
  });

  tl.to(
    ghostTask,
    {
      x: 0,
      opacity: 1,
      duration: 0.4,
    },
    '<',
  );

  tl.to(activeTaskRow, { height: 0, margin: 0, padding: 0, duration: 0.2 });
}

function deleteCompltTask(index) {
  const taskRow = document.getElementById(`complt-${index}`);

  // 2. Animate it out
  gsap.to(taskRow, {
    x: -800,
    duration: 0.4,
    ease: 'power2.in',

    // 3. The Cleanup (Delete data ONLY after animation finishes)
    onComplete: () => {
      taskArrComplt.splice(index, 1);
      localStorage.setItem('taskscomplt', JSON.stringify(taskArrComplt));
      showTaskChecked();
    },
  });
}
const borderPath = document.querySelector('.border-path');

if (borderPath) {
  const pathLength = borderPath.getTotalLength();

  gsap.set(borderPath, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength,
  });

  gsap.to(borderPath, {
    strokeDashoffset: 0,
    duration: 2,
    ease: 'power2.inOut',
    delay: 0.3,
  });
}

renderAll();
