import { Trash } from 'phosphor-react';
import { useState } from 'react';
import styles from './Task.module.css';

interface Task {
  identifier: number | undefined,
  task: string | undefined,
  isCompleted: boolean | undefined,
  deleteTask: (id: number | undefined) => void;
  updateTask: (id: number | undefined, updateCompleted:boolean) => void;
}

export function Task({identifier, task, isCompleted, deleteTask, updateTask}: Task) {
  const [taskCompleted, setTaskCompleted] = useState(isCompleted)

  function handleTaskCompleted(){
    setTaskCompleted(!taskCompleted)
    updateTask(identifier, !taskCompleted)
  }

  function handleDeleteTask(){
    return deleteTask(identifier)
  }
  
  return (
    <div className={styles.task}>
      <div className={styles.content}>
        <input 
          type="checkbox"
          defaultChecked={taskCompleted}
          onClick={handleTaskCompleted}
        />
        <strong>{task}</strong>
      </div>

      <button>
        <Trash 
          size={24}
          onClick={handleDeleteTask}
        />
      </button>

    </div>
  );
}