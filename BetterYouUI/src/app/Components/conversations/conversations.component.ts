import { Component,AfterViewChecked, ElementRef, ViewChild, OnInit, SimpleChanges, Input } from '@angular/core';
import { SignalRService } from '../../services/signal-r.service';
import { GroupChatService } from '../../services/GroupChatService.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Conversation, Group, GroupChatMessage, User } from '../../Models/Models';
import { UserService } from '../../services/DataServices/user.service';
import { ConversationService } from '../../services/ConversationService.service'
import { MessagingComponent } from '../messaging/messaging.component';
import { AccordionModule } from 'primeng/accordion';;
@Component({
  selector: 'app-conversations',
  standalone: true,
  imports: [InputTextModule,FormsModule,CommonModule,AccordionModule, MessagingComponent],
  templateUrl: './conversations.component.html',
  styleUrl: './conversations.component.scss'
})
export class ConversationsComponent {
getUser(conversation: Conversation):User {
  return this.users.find(user=>user.userId== conversation.user2Id)||{userName: 'Unknown User', userId: -1, email: '', passwordHash: '', createdAt: new Date()};
}

  public users: User[] = [];
  public selectedUser: User | null = null;
  public conversations: Conversation[] = [];
  public loggedInUser: User | null = null;
  public searchTerm: string = '';

  constructor(
    private conversationService: ConversationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.userService.getLoggedInUser();
    this.loadUsers();
  }

  loadUsers(): void {
    // Replace with actual service call to get users
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  startConversation(user: User): void {
    if (this.loggedInUser) {
      this.conversationService
        .getConversation(this.loggedInUser.userId, user.userId)
        .subscribe((conversation) => {
          this.conversations.push(conversation);
        });
    }
  }

  searchUsers(): User[] {
    return this.users.filter(user => user.userName.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
}
