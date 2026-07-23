import { Component, Input } from '@angular/core';
import { Column } from '../models/task.model';

@Component({
  selector: 'app-board-column',
  imports: [],
  templateUrl: './board-column.component.html',
  styleUrl: './board-column.component.scss'
})
export class BoardColumnComponent {
  @Input() column!: Column;

}
