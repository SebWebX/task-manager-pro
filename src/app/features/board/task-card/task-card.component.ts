import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Task } from '../models/task.model';
import { TitleCasePipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [TitleCasePipe, DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() moveLeft = new EventEmitter<string>();
  @Output() moveRight = new EventEmitter<string>();

  getLabelColor(label: string): string {
    const colors: { [key: string]: string } = {
      'UX': 'rgba(107, 122, 247, 0.15)',
      'Diseño': 'rgba(31, 173, 131, 0.15)',
      'Testing': 'rgba(224, 79, 122, 0.15)',
      'Setup': 'rgba(232, 160, 48, 0.15)',
      'Branding': 'rgba(224, 79, 122, 0.15)',
    };
    return colors[label] || 'rgba(31, 173, 131, 0.15)';
  }

  getLabelTextColor(label: string): string {
    const colors: { [key: string]: string } = {
      'UX': '#8a97f7',
      'Diseño': '#1fad83',
      'Testing': '#e04f7a',
      'Setup': '#e8a030',
      'Branding': '#e04f7a',
    };
    return colors[label] || '#1fad83';
  }

  onMoveLeft(): void {
    this.moveLeft.emit(this.task.id);
  }

  onMoveRight(): void {
    this.moveRight.emit(this.task.id);
  }
}