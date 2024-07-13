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
  public user2: User | null = null;
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
      //populate the user
      this.user = this.userService.getLoggedInUser();
      //if the logged in user is user1 on conversation, get user2
      if(this.conversation.user1Id === this.user?.userId){
        this.userService.getUsers().subscribe((users) => {
          this.user2 = users.find(user => user.userId == this.conversation.user2Id)||{userName: 'Unknown User', userId: -1, email: '', passwordHash: '', createdAt: new Date()};
        });
        //if the logged in user is user2 on conversation, get user1
      }else if(this.conversation.user2Id === this.user?.userId){
        this.userService.getUsers().subscribe((users) => {
          this.user2 = users.find(user => user.userId == this.conversation.user1Id)||{userName: 'Unknown User', userId: -1, email: '', passwordHash: '', createdAt: new Date()};
        });
      }
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
  getUserById(messageUserId: string): User {
    if(messageUserId === this.user?.userId.toString()){
      return this.user;
    }else if(messageUserId === this.user2?.userId.toString()){
      return this.user2;
    }
    return {userName: 'Unknown User', userId: -1, email: '', passwordHash: '', createdAt: new Date()};
  }
}
