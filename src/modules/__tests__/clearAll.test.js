/** * @jest-environment jsdom */

import filterAll from '../clearAll.js';
import UIDisplay from '../userInterface.js';

describe('Clear all / edit input / completed', () => {
  test('Clear all tasks', () => {
    document.body.innerHTML = '<section id="todo-list"><div id="header"><h2>Today\'s Tasks</h2><i id="sync"><svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="m13 7.101.01.001a4.978 4.978 0 0 1 2.526 1.362 5.005 5.005 0 0 1 1.363 2.528 5.061 5.061 0 0 1-.001 2.016 4.976 4.976 0 0 1-1.363 2.527l1.414 1.414a7.014 7.014 0 0 0 1.908-3.54 6.98 6.98 0 0 0 0-2.819 6.957 6.957 0 0 0-1.907-3.539 6.97 6.97 0 0 0-2.223-1.5 6.921 6.921 0 0 0-1.315-.408c-.137-.028-.275-.043-.412-.063V2L9 6l4 4V7.101zm-7.45 7.623c.174.412.392.812.646 1.19.249.37.537.718.854 1.034a7.036 7.036 0 0 0 2.224 1.501c.425.18.868.317 1.315.408.167.034.338.056.508.078v2.944l4-4-4-4v3.03c-.035-.006-.072-.003-.107-.011a4.978 4.978 0 0 1-2.526-1.362 4.994 4.994 0 0 1 .001-7.071L7.051 7.05a7.01 7.01 0 0 0-1.5 2.224A6.974 6.974 0 0 0 5 12a6.997 6.997 0 0 0 .55 2.724z"></path></svg></i></div><form id="add-task"><input type="text" id="add" placeholder="Add a new task..."><i id="add-icon"><svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M18 6h2v12h-2zm-2 5H7.414l4.293-4.293-1.414-1.414L3.586 12l6.707 6.707 1.414-1.414L7.414 13H16z"></path></svg></i></form><ul id="task-list"></ul><a href="#" id="clear-all">Clear all completed tasks</a></section>';

    const tasks = [
      {
        description: 'Gordo',
        completed: true,
        index: 1,
      },
      {
        description: 'Nunito',
        completed: true,
        index: 2,
      },
      {
        description: 'Say Vior the Bitch',
        completed: false,
        index: 3,
      },
    ];

    for (let i = 0; i < tasks.length; i += 1) {
      UIDisplay.createTask(tasks[i]);
    }

    filterAll(tasks);

    const list = document.querySelectorAll('.task');
    expect(list).toHaveLength(1);
  });
});

test('editing input', () => {
  document.body.innerHTML = '<ul id="task-list"><li class="task"><input type="checkbox" class="checkB"><input class="task-d"><i class="fa-solid fa-ellipsis-vertical show"></i><i class="fa-solid fa-trash-can"></i></li></ul>';

  const task = [
    {
      description: 'Gordo',
      completed: true,
      index: 1,
    },
    {
      description: 'Kiko',
      completed: true,
      index: 2,
    },
    {
      description: 'Nunito',
      completed: false,
      index: 3,
    },
  ];

  const changeDesc = (input) => {
    input.value = 'queen Maleficent';
    task[0].description = input.value;
  };

  const input = document.querySelectorAll('.task-d');
  UIDisplay.createTask(task);
  changeDesc(input, task);
  expect(input.value).toBe('queen Maleficent');
});

test('Update status false to true', () => {
  const task = [
    {
      description: 'Gordo',
      completed: true,
      index: 1,
    },
    {
      description: 'Kiko',
      completed: true,
      index: 2,
    },
    {
      description: 'Nunito',
      completed: false,
      index: 3,
    },
  ];

  for (let i = 0; i < task.length; i += 1) {
    UIDisplay.createTask(task[i]);
  }

  const checkTask = (el) => {
    if (el.completed === false) {
      el.completed = true;
    } else {
      el.completed = false;
    }
  };

  for (let i = 0; i < task.length; i += 1) {
    checkTask(task[i]);
  }

  expect(task[0].completed).toBe(false);
  expect(task[2].completed).toBe(true);
});
