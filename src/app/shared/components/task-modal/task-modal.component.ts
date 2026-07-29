import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ModalService } from '../../../core/services/modal.service';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';
import { Task, Priority, TaskStatus } from '../../../features/board/models/task.model';


@Component({
  selector: 'app-task-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TaskModalComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;
  private subscription!: Subscription;

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    priority: new FormControl('alta', [Validators.required]),
    date: new FormControl('')
  });


  constructor(private modalService: ModalService, private taskService: TaskService) {}


  ngOnInit(): void{
    this.subscription = this.modalService.isModalOpen$.subscribe(value =>{
      this.isOpen = value;
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  onSubmit(): void{
    if (this.taskForm.valid){
      const formValue = this.taskForm.value;

      const newTask: Task ={
        id: Date.now().toString(),
        title: formValue.title!,
        description: formValue.description || '',
        priority: formValue.priority as Priority,
        status: TaskStatus.Todo,
        labels: [],
        date: formValue.date ? new Date(formValue.date) : new Date()
      };

      this.taskService.addTask(newTask, '01');
      this.taskForm.reset({ priority: 'alta'});
      this.closeModal();
    }
  }

  
}