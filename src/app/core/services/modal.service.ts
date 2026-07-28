import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isModalOpenSubject = new BehaviorSubject<boolean>(false);

  isModalOpen$ = this.isModalOpenSubject.asObservable();

  constructor() {}

  openModal(): void{
    this.isModalOpenSubject.next(true);
  }

  closeModal(): void{
    this.isModalOpenSubject.next(false);
  }
  
}
