import { Component,AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
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
export class ChatComponent implements OnInit, AfterViewChecked {
  public user!: string;
  public message!: string;
  public messages: { user: string, text: string }[] = [];
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  constructor(private signalRService: SignalRService) {
    this.messages= [];

  }
  ngOnInit(): void {
    this.signalRService.messageReceived$.subscribe((msg) => {
      this.messages.push(msg);
      this.scrollToBottom();
    });
  }
  public sendMessage(): void {
    const newMessage = { user: this.user, text: this.message };
    //this.messages.push(newMessage);
    this.signalRService.sendMessage(this.user, this.message);
    this.message = '';
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }
}
