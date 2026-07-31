import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FilterState {
  priority: string | null;
  label: string | null;
  sortBy: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterSubject = new BehaviorSubject<FilterState>({
    priority: null,
    label: null,
    sortBy: null
  });

  filters$ = this.filterSubject.asObservable();

  setFilter(key: keyof FilterState, value: string | null): void {
    const current = this.filterSubject.value;
    this.filterSubject.next({ ...current, [key]: value });
  }

  clearFilters(): void {
    this.filterSubject.next({ priority: null, label: null, sortBy: null });
  }

  get currentFilters(): FilterState {
    return this.filterSubject.value;
  }
}