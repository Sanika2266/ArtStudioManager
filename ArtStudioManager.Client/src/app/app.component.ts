import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeSection: string = 'categories';

  setActive(section: string): void {
    this.activeSection = section;
  }
}