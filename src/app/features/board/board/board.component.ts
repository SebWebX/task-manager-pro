import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Column, Task } from '../models/task.model';
import { TaskService } from '../../../core/services/task.service';
import { BoardColumnComponent } from '../board-column/board-column.component';
import { FilterService, FilterState } from '../../../core/services/filter.service';

@Component({
  selector: 'app-board',
  imports: [BoardColumnComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BoardComponent implements OnInit {
  columns: Column[] = [];
  filteredColumns: Column[] = [];

  constructor(
    private taskService: TaskService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.columns = this.taskService.getColumns();
    this.filteredColumns = this.columns;

    this.filterService.filters$.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  applyFilters(filters: FilterState): void {
    this.filteredColumns = this.columns.map(column => ({
      ...column,
      tasks: this.filterAndSort(column.tasks, filters)
    }));
  }

  filterAndSort(tasks: Task[], filters: FilterState): Task[] {
    let result = [...tasks];

    if (filters.priority) {
      result = result.filter(t => t.priority === filters.priority);
    }

    if (filters.sortBy === 'date') {
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (filters.sortBy === 'priority') {
      const order: { [key: string]: number } = { alta: 0, media: 1, baja: 2 };
      result.sort((a, b) => order[a.priority] - order[b.priority]);
    }

    return result;
  }
}