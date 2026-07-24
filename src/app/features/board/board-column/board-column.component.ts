import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Column } from '../models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-board-column',
  imports: [TaskCardComponent],
  templateUrl: './board-column.component.html',
  styleUrl: './board-column.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BoardColumnComponent {
  @Input() column!: Column;

}
