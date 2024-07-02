import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [HeaderComponent , RouterLink ,RouterOutlet],
  templateUrl: './log.component.html',
  styleUrl: './log.component.css'
})
export class LogComponent {

}
