import { Component, ViewEncapsulation } from '@angular/core';
import { ModalService } from '../../../core/services/modal.service';
import { FilterService, FilterState } from '../../../core/services/filter.service';

@Component({
  selector: 'app-board-controls',
  imports: [],
  templateUrl: './board-controls.component.html',
  styleUrl: './board-controls.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BoardControlsComponent {
  showFilterMenu: boolean = false;
  showSortMenu: boolean = false;
  activeFilters: FilterState = { priority: null, label: null, sortBy: null };

  constructor(
    private modalService: ModalService,
    private filterService: FilterService
  ) {
    this.filterService.filters$.subscribe(filters => {
      this.activeFilters = filters;
    });
  }

  get hasActiveFilters(): boolean {
    return !!(this.activeFilters.priority || this.activeFilters.label);
  }

  get hasActiveSort(): boolean {
    return !!this.activeFilters.sortBy;
  }

  openModal(): void {
    this.modalService.openModal();
  }

  toggleFilterMenu(): void {
    this.showFilterMenu = !this.showFilterMenu;
    this.showSortMenu = false;
  }

  toggleSortMenu(): void {
    this.showSortMenu = !this.showSortMenu;
    this.showFilterMenu = false;
  }

  filterByPriority(priority: string | null): void {
    this.filterService.setFilter('priority', priority);
    this.showFilterMenu = false;
  }

  sortBy(value: string | null): void {
    this.filterService.setFilter('sortBy', value);
    this.showSortMenu = false;
  }
}