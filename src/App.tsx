import './global.css';
import styles from './App.module.css';
import { Header } from './components/Header';
import { PlusCircle } from 'phosphor-react';
import { EmptyList } from './components/EmptyList';
import { Task } from './components/Task';
import { useState, FormEvent, ChangeEvent } from 'react';

interface TaskProps {
  id: number | undefined,
  task: string | undefined,
  isCompleted: boolean
}

export function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const [newTask, setNewTask] = useState('');

  function handleNewTask(event: FormEvent){
    event.preventDefault();
    setTasks(
      [
        ...tasks, 
        {
          id: tasks.length + 1,
          task: newTask,
          isCompleted: false,
        }
      ]
    )
    setNewTask('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>){
    event.target.setCustomValidity('');
    setNewTask(event.target.value);
  }

  function handleDeleteTask(id: number | undefined){
    const newTasks = tasks.filter(data => {
      return data.id !== id
    })

    setTasks(newTasks)
  }

  function handleUpdateTask(id: number | undefined, updateCompleted: boolean){
    const task = tasks.find(data => {
        return data.id === id
    })

    const newTasks = tasks.filter((data: TaskProps) => {
      return data.id !== id
    })

    const updatedTask = {
        ...task,
        isCompleted: updateCompleted,
    }

    setTasks(
      [
        ...newTasks, 
        {
          id: updatedTask.id,
          task: updatedTask.task,
          isCompleted: updatedTask.isCompleted,
        }
      ]
    )   
  }

  const countCompletedTasks = () => {
    var count = 0;
    
    for (var t of tasks) {
      if (t.isCompleted){
        count += 1
      }
    }

    return count;
  }

  const countTasks = tasks.length;
  
  const taskIsEmpty = newTask.length === 0 ? true : false

  return (
    <div>
      <Header />

      <main>
        <form onSubmit={handleNewTask} className={styles.newTask}>
          <input 
            type="text"
            placeholder="Adicione uma tarefa"
            value={newTask}
            onChange={handleNewTaskChange}
            required
          />
          <button 
            type='submit'
            disabled={taskIsEmpty}
          >
            Criar 
            <PlusCircle size={17}/>
          </button>
        </form>

        <section className={styles.content}>

          <div className={styles.info}>
            <strong className={styles.createdTasks}>
              Tarefas criadas
              <div>{countTasks}</div>              
            </strong>

            <strong className={styles.completedTasks}>
              Concluídas
              <div>{`${countCompletedTasks()} de ${countTasks}`}</div>              
            </strong>
          </div>

          <div className={styles.tasks}>
            {tasks.length === 0 ? <EmptyList /> :
              tasks.map(data => {
                return <Task 
                  identifier={data.id}  
                  task={data.task} 
                  isCompleted={data.isCompleted}
                  key={data.id}
                  deleteTask={handleDeleteTask}
                  updateTask={handleUpdateTask}
                />
            })}
          </div>
        </section>

      </main>
    </div>
  )
}