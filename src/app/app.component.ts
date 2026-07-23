import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { TopbarComponent } from './shared/components/topbar/topbar.component';
import { BoardControlsComponent } from './features/board/board-controls/board-controls.component';
import { BoardComponent } from './features/board/board/board.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, BoardControlsComponent, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'task-manager-pro';

  constructor(private renderer: Renderer2){}

  ngOnInit(): void{
    this.renderer.addClass(document.body, 'dark');
  }
}


