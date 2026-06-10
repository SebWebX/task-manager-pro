import { Injectable } from '@angular/core';
import { Column, TaskStatus } from '../../features/board/models/task.model';

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
}
