import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Column } from '../models/task.model';
import { TaskService } from '../../../core/services/task.service';
import { BoardColumnComponent } from '../board-column/board-column.component';


@Component({
  selector: 'app-board',
  imports: [BoardColumnComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BoardComponent implements OnInit {
  columns: Column[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void{
    this.columns = this.taskService.getColumns();
  }
}
