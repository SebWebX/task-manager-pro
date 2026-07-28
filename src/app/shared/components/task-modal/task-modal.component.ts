import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ModalService } from '../../../core/services/modal.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-task-modal',
  imports: [],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TaskModalComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;
  private subscription!: Subscription;


  constructor(private modalService: ModalService){}


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
}