import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {

  constructor(private router: Router) { }
  @Input() errorMessage = this.router.getCurrentNavigation()?.extras.state?.['errorMessage']
}
