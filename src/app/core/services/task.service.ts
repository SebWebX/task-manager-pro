import { Injectable } from '@angular/core';
import { Column, TaskStatus, Task } from '../../features/board/models/task.model';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private columns: Column[] = [
    {
    id: '01',
    title: 'Por hacer',
    color: '#e8a030',
    status: TaskStatus.Todo,
    tasks: []
  },
  {
    id: '02',
    title: 'En progreso',
    color: '#6b7af7',
    status: TaskStatus.InProgress,
    tasks: []
  },
  {
    id: '03',
    title: 'En revisión',
    color: '#e04f7a',
    status: TaskStatus.ToRevision,
    tasks: []
  },
  {
    id: '04',
    title: 'Completado',
    color: '#1fad83',
    status: TaskStatus.Completed,
    tasks: []
  }
];
 
 constructor() { }
  
 getColumns(): Column[]{
  return [...this.columns];
  }


  addTask(task: Task, columnId: string): void{
    const column = this.columns.find(col => col.id === columnId)
    if (column){
     column.tasks.push(task);
    }
  }

  deleteTask(taskId: string, columnId: string): void{
    const column = this.columns.find(col => col.id === columnId);
  
    if(column){
      column.tasks = column.tasks.filter(task => task.id !== taskId);
    }
  }

  moveTask(taskId: string, columnId: string, newStatus: TaskStatus): void{
    const column = this.columns.find(col => col.id === columnId);

    if(column){
      const task = column.tasks.find(t => t.id === taskId);

      if(task){
        task.status = newStatus;
      }
    }
  }

  updateTask(updatedTask: Task, columnId: string): void{
    const column = this.columns.find(col => col.id === columnId);

    if(column){
      const taskIndex = column.tasks.findIndex(t => t.id === updatedTask.id);

      if (taskIndex !== -1){
        column.tasks[taskIndex] = updatedTask;
      }
    }
  }
}

