import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ModalService } from '../../../core/services/modal.service';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';
import { Task, Priority, TaskStatus } from '../../../features/board/models/task.model';

@Component({
  selector: 'app-task-modal',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TaskModalComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;
  selectedColumnId: string = '01';
  private subscription!: Subscription;

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    priority: new FormControl('alta', [Validators.required]),
    date: new FormControl('')
  });

  labels: string[] = [];
  assigned: string[] = [];
  subtasks: { text: string, completed: boolean }[] = [];
  newLabel: string = '';
  newAssigned: string = '';
  newSubtask: string = '';

  constructor(private modalService: ModalService, private taskService: TaskService) {}

  ngOnInit(): void {
    this.subscription = this.modalService.isModalOpen$.subscribe(value => {
      this.isOpen = value;
    });

    this.modalService.selectedColumn$.subscribe(columnId => {
      this.selectedColumnId = columnId;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  addLabel(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.newLabel.trim()) {
      event.preventDefault();
      this.labels.push(this.newLabel.trim());
      this.newLabel = '';
    }
  }

  removeLabel(index: number): void {
    this.labels.splice(index, 1);
  }

  addAssigned(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.newAssigned.trim()) {
      event.preventDefault();
      this.assigned.push(this.newAssigned.trim());
      this.newAssigned = '';
    }
  }

  removeAssigned(index: number): void {
    this.assigned.splice(index, 1);
  }

  addSubtask(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.newSubtask.trim()) {
      event.preventDefault();
      this.subtasks.push({ text: this.newSubtask.trim(), completed: false });
      this.newSubtask = '';
    }
  }

  removeSubtask(index: number): void {
    this.subtasks.splice(index, 1);
  }

  toggleSubtask(index: number): void {
    this.subtasks[index].completed = !this.subtasks[index].completed;
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;

      const newTask: Task = {
        id: Date.now().toString(),
        title: formValue.title!,
        description: formValue.description || '',
        priority: formValue.priority as Priority,
        status: TaskStatus.Todo,
        labels: this.labels,
        assigned: this.assigned,
        subtask: this.subtasks,
        date: formValue.date ? new Date(formValue.date) : new Date()
      };

      this.taskService.addTask(newTask, this.selectedColumnId);
      this.taskForm.reset({ priority: 'alta' });
      this.labels = [];
      this.assigned = [];
      this.subtasks = [];
      this.closeModal();
    }
  }
}