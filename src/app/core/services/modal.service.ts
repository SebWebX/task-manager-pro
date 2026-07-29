import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isModalOpenSubject = new BehaviorSubject<boolean>(false);

  private selectedColumnSubject = new BehaviorSubject<string>('01');
  selectedColumn$ = this.selectedColumnSubject.asObservable();

  isModalOpen$ = this.isModalOpenSubject.asObservable();

  constructor() {}

  openModal(columnId: string = '01'): void{
    this.selectedColumnSubject.next(columnId);
    this.isModalOpenSubject.next(true);
  }

  closeModal(): void{
    this.isModalOpenSubject.next(false);
  }
  
}
