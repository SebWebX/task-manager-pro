export enum Priority {
    Alta = 'alta',
    Media = 'media',
    Baja = 'baja'
}

 export enum TaskStatus {
    Todo = 'todo',
    InProgress = 'inprogress',
    ToRevision = 'torevision',
    Completed = 'completed'
}

export interface Task{
    id: string;
    title: string;
    description: string;
    priority: Priority;
    status: TaskStatus;
    labels: string[];
    date: Date;
    subtask?: Subtask[];
    assigned?: string[];
    comments?: number;
}

export interface Subtask{
    text: string;
    completed: boolean;
}

export interface Column{
    id: string;
    title: string;
    color: string;
    status: TaskStatus;
    tasks: Task[];
}