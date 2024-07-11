import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
//import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
    SideBarComponent,
  ]
})
export class AppComponent {
  title = 'BetterYouUI';

  // constructor(signalr: SignalRService){ 
  //  // signalr.initializeSignalR();
  // }
}
