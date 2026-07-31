import { Injectable } from '@angular/core';
import { Column, TaskStatus, Task, Priority } from '../../features/board/models/task.model';

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
    tasks: [
      {
        id: 'task-01',
        title: 'Diseñar flujo de usuario',
        description: 'Crear diagrama de navegación para la app.',
        priority: Priority.Alta,
        status: TaskStatus.Todo,
        labels: ['UX', 'Diseño'],
        date: new Date('2024-04-21'),
        comments: 4,
        subtask: [
          { text: 'Instalar Angular CLI', completed: true },
          { text: 'Crear estructura base', completed: false }
        ],
        assigned: ['SE', 'DR'],
      }
    ]
    
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
 
 constructor() {
  const saved = localStorage.getItem('task-manager-columns');
  if(saved){
    this.columns = JSON.parse(saved);
    this.columns.forEach(column =>{
      column.tasks.forEach(task =>{
        task.date = new Date(task.date);
      });
    });
   }
  }

  private saveToLocalStorage(): void{
    localStorage.setItem('task-manager-columns', JSON.stringify(this.columns));
  }
  
 getColumns(): Column[]{
  return this.columns;
 }


  addTask(task: Task, columnId: string): void{
    const column = this.columns.find(col => col.id === columnId)
    if (column){
     column.tasks.push(task);
    }

    this.saveToLocalStorage();
  }

  deleteTask(taskId: string, columnId: string): void{
    const column = this.columns.find(col => col.id === columnId);
  
    if(column){
      column.tasks = column.tasks.filter(task => task.id !== taskId);
    }

    this.saveToLocalStorage();
  }

  moveTask(taskId: string, fromColumnId: string, toColumnId: string): void {
    const fromColumn = this.columns.find(col => col.id === fromColumnId);
    const toColumn = this.columns.find(col => col.id === toColumnId);

    if(fromColumn && toColumn){
      const taskIndex = fromColumn.tasks.findIndex(t => t.id === taskId);

      if(taskIndex !== -1){
        const task = fromColumn.tasks[taskIndex];
        task.status = toColumn.status;
        fromColumn.tasks.splice(taskIndex, 1);
        toColumn.tasks.push(task);
      }
    }

    this.saveToLocalStorage();
  }

  updateTask(updatedTask: Task, columnId: string): void{
    const column = this.columns.find(col => col.id === columnId);

    if(column){
      const taskIndex = column.tasks.findIndex(t => t.id === updatedTask.id);

      if (taskIndex !== -1){
        column.tasks[taskIndex] = updatedTask;
      }
    }

    this.saveToLocalStorage();
  }
}

