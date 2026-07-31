import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
            { text: 'Investigar patrones de navegación', completed: true },
            { text: 'Crear wireframes', completed: false }
          ],
          assigned: ['SE', 'DR'],
        },
        {
          id: 'task-02',
          title: 'Configurar entorno Angular',
          description: 'Setup inicial del proyecto con Angular 19.',
          priority: Priority.Media,
          status: TaskStatus.Todo,
          labels: ['Setup'],
          date: new Date('2024-04-22'),
          comments: 2,
          subtask: [
            { text: 'Instalar Angular CLI', completed: false },
            { text: 'Crear estructura base', completed: false }
          ],
          assigned: ['SE'],
        },
        {
          id: 'task-03',
          title: 'Documentar API REST',
          description: 'Crear documentación de los endpoints disponibles.',
          priority: Priority.Baja,
          status: TaskStatus.Todo,
          labels: ['Docs'],
          date: new Date('2024-04-25'),
          comments: 1,
          assigned: ['AM'],
        }
      ]
    },
    {
      id: '02',
      title: 'En progreso',
      color: '#6b7af7',
      status: TaskStatus.InProgress,
      tasks: [
        {
          id: 'task-04',
          title: 'Desarrollar componente Kanban',
          description: 'Implementar tablero con columnas arrastrables.',
          priority: Priority.Alta,
          status: TaskStatus.InProgress,
          labels: ['Frontend', 'Angular'],
          date: new Date('2024-04-20'),
          comments: 6,
          subtask: [
            { text: 'Crear board component', completed: true },
            { text: 'Crear column component', completed: true },
            { text: 'Crear task card', completed: false }
          ],
          assigned: ['SE', 'DR'],
        },
        {
          id: 'task-05',
          title: 'Pruebas de usabilidad',
          description: 'Evaluar qué tan intuitiva es la interfaz.',
          priority: Priority.Media,
          status: TaskStatus.InProgress,
          labels: ['Testing', 'UX'],
          date: new Date('2024-04-19'),
          comments: 5,
          subtask: [
            { text: 'Definir objetivos', completed: true },
            { text: 'Reclutar participantes', completed: true },
            { text: 'Crear materiales', completed: false }
          ],
          assigned: ['AM'],
        }
      ]
    },
    {
      id: '03',
      title: 'En revisión',
      color: '#e04f7a',
      status: TaskStatus.ToRevision,
      tasks: [
        {
          id: 'task-06',
          title: 'Seleccionar paleta de colores',
          description: 'Definir tokens de color para el design system.',
          priority: Priority.Baja,
          status: TaskStatus.ToRevision,
          labels: ['Diseño', 'Branding'],
          date: new Date('2024-04-18'),
          comments: 3,
          assigned: ['SE', 'DR', 'AM'],
        }
      ]
    },
    {
      id: '04',
      title: 'Completado',
      color: '#1fad83',
      status: TaskStatus.Completed,
      tasks: [
        {
          id: 'task-07',
          title: 'Diseñar dashboard principal',
          description: 'Mockup completo del tablero Kanban.',
          priority: Priority.Alta,
          status: TaskStatus.Completed,
          labels: ['Diseño'],
          date: new Date('2024-04-15'),
          comments: 4,
          subtask: [
            { text: 'Investigar la marca', completed: true },
            { text: 'Definir audiencia', completed: true },
            { text: 'Objetivos UI', completed: true }
          ],
          assigned: ['SE'],
        },
        {
          id: 'task-08',
          title: 'Setup repositorio GitHub',
          description: 'Configurar repo con ramas y protecciones.',
          priority: Priority.Media,
          status: TaskStatus.Completed,
          labels: ['DevOps'],
          date: new Date('2024-04-10'),
          comments: 2,
          assigned: ['SE'],
        }
      ]
    }
  ];

  private columnsSubject = new BehaviorSubject<Column[]>(this.columns);
  columns$ = this.columnsSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem('task-manager-columns');
    if (saved) {
      this.columns = JSON.parse(saved);
      this.columns.forEach(column => {
        column.tasks.forEach(task => {
          task.date = new Date(task.date);
        });
      });
      this.columnsSubject.next(this.columns);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('task-manager-columns', JSON.stringify(this.columns));
    this.columnsSubject.next([...this.columns]);
  }

  getColumns(): Column[] {
    return this.columns;
  }

  addTask(task: Task, columnId: string): void {
    const column = this.columns.find(col => col.id === columnId);
    if (column) {
      column.tasks.push(task);
    }
    this.saveToLocalStorage();
  }

  deleteTask(taskId: string, columnId: string): void {
    const column = this.columns.find(col => col.id === columnId);
    if (column) {
      column.tasks = column.tasks.filter(task => task.id !== taskId);
    }
    this.saveToLocalStorage();
  }

  moveTask(taskId: string, fromColumnId: string, toColumnId: string): void {
    const fromColumn = this.columns.find(col => col.id === fromColumnId);
    const toColumn = this.columns.find(col => col.id === toColumnId);

    if (fromColumn && toColumn) {
      const taskIndex = fromColumn.tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        const task = fromColumn.tasks[taskIndex];
        task.status = toColumn.status;
        fromColumn.tasks.splice(taskIndex, 1);
        toColumn.tasks.push(task);
      }
    }
    this.saveToLocalStorage();
  }

  updateTask(updatedTask: Task, columnId: string): void {
    const column = this.columns.find(col => col.id === columnId);
    if (column) {
      const taskIndex = column.tasks.findIndex(t => t.id === updatedTask.id);
      if (taskIndex !== -1) {
        column.tasks[taskIndex] = updatedTask;
      }
    }
    this.saveToLocalStorage();
  }
}