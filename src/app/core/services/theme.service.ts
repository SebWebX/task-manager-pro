import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private isDarkSubject = new BehaviorSubject<boolean>(true);
  isDark$ = this.isDarkSubject.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    const saved = localStorage.getItem('theme');
    const isDark = saved ? saved === 'dark' : true;
    this.applyTheme(isDark);
   }

   toggleTheme(): void{
    const isDark = !this.isDarkSubject.value;
    this.applyTheme(isDark);
   }

   private applyTheme(isDark: boolean): void{
    this.isDarkSubject.next(isDark);
    if(isDark){
      this.renderer.addClass(document.body, 'dark');
      this.renderer.removeClass(document.body, 'light');
    }else{
      this.renderer.addClass(document.body, 'light');
      this.renderer.removeClass(document.body, 'dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
   }
}
