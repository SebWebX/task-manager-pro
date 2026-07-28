import { Component, ViewEncapsulation } from '@angular/core';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-board-controls',
  imports: [],
  templateUrl: './board-controls.component.html',
  styleUrl: './board-controls.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BoardControlsComponent {

  constructor(private modalService: ModalService){}

  openModal(): void{
    this.modalService.openModal();
  }

}
