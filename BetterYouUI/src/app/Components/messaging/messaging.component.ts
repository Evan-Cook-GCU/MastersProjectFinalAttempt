import { Component,AfterViewChecked, ElementRef, ViewChild, OnInit, SimpleChanges, Input } from '@angular/core';
import { SignalRService } from '../../services/signal-r.service';
import { GroupChatService } from '../../services/GroupChatService.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Conversation, Group, GroupChatMessage, Message, User } from '../../Models/Models';
import { UserService } from '../../services/DataServices/user.service';
import { ConversationService } from '../../services/ConversationService.service';

@Component({
  selector: 'app-messaging',
  standalone: true,
  imports: [InputTextModule,FormsModule,CommonModule],
  templateUrl: './messaging.component.html',
  styleUrl: './messaging.component.scss'
})
export class MessagingComponent {
  @Input() conversation!: Conversation;
  public user!: User | null;
  public message: string = '';
  public messages: Message[] = [];

  constructor(
    private conversationService: ConversationService,
    private userService: UserService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conversation']) {
      this.updateConversation();
    }
  }

  updateConversation(): void {
    if (this.conversation) {
      this.user = this.userService.getLoggedInUser();
      this.messages = this.conversation.messages;
      this.conversationService.messageReceived$.subscribe((msg) => {
        if (msg.conversationId === this.conversation.conversationId) {
          this.messages.push(msg);
        }
      });
    }
  }

  sendMessage(): void {
    if (this.conversation && this.user) {
      this.conversationService.sendMessage(this.conversation.conversationId, this.user.userId, this.message);
      this.message = '';
    }
  }
}
