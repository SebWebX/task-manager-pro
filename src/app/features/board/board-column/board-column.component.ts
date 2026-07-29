import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Column } from '../models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskService } from '../../../core/services/task.service';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-board-column',
  imports: [TaskCardComponent],
  templateUrl: './board-column.component.html',
  styleUrl: './board-column.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BoardColumnComponent {
  @Input() column!: Column;

  constructor(private taskService: TaskService, private modalService: ModalService) {}

  openModal(): void{
    this.modalService.openModal(this.column.id);
  }

  onMoveLeft(taskId: string): void {
    const columns = this.taskService.getColumns();
    const currentIndex = columns.findIndex(col => col.id === this.column.id);
    if (currentIndex > 0) {
      const targetColumn = columns[currentIndex - 1];
      this.taskService.moveTask(taskId, this.column.id, targetColumn.id);
    }
  }

  onMoveRight(taskId: string): void {
    const columns = this.taskService.getColumns();
    const currentIndex = columns.findIndex(col => col.id === this.column.id);
    if (currentIndex < columns.length - 1) {
      const targetColumn = columns[currentIndex + 1];
      this.taskService.moveTask(taskId, this.column.id, targetColumn.id);
    }
  }
}