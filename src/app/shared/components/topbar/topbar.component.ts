import { Component, ViewEncapsulation } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TopbarComponent {
  isDark: boolean = true;

  constructor(private themeService: ThemeService){
    this.themeService.isDark$.subscribe(value =>{
      this.isDark = value;
    })
  }

  toggleTheme(): void{
    this.themeService.toggleTheme();
  }

}
