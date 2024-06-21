import { Component } from '@angular/core';
import { ContentComponent } from './content/content.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ContentComponent, NavbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.sass'
})
export class LayoutComponent {

}
