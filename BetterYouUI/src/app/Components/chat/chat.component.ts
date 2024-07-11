import { Component } from '@angular/core';
import { SignalRService } from '../../services/signal-r.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [InputTextModule,FormsModule,CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  public user!: string;
  public message!: string;

  constructor(private signalRService: SignalRService) {}

  public sendMessage(): void {
    this.signalRService.sendMessage(this.user, this.message);
  }
}
