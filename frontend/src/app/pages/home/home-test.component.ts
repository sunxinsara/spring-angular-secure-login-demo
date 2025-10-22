import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-test',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="home-test-wrap"><h2>Home Test Page</h2><p>This is a simple test page for routing.</p></div>`,
  styleUrls: ['./home-test.component.scss']
})
export class HomeTestComponent {}
