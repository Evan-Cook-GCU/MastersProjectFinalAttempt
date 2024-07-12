import { Component,AfterViewChecked, ElementRef, ViewChild, OnInit, SimpleChanges, Input } from '@angular/core';
import { SignalRService } from '../../services/signal-r.service';
import { GroupChatService } from '../../services/GroupChatService.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Group, User } from '../../Models/Models';
import { UserService } from '../../services/DataServices/user.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [InputTextModule,FormsModule,CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements  AfterViewChecked {
  public user!: User|null;
  public message!: string;
  @Input() group: Group | null = null;
  public messages: { user: string, text: string }[] = [];
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(private groupChat:GroupChatService, private userService: UserService) {
    this.messages= [];

  }
  
  updateGroup(): void {
    if (this.group && this.group.groupId != 0) {
      this.user = this.userService.getLoggedInUser();
      this.groupChat.messageReceived$.subscribe((msg) => {
        this.messages.push(msg);
        this.scrollToBottom();
      });
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['group']) {
      this.updateGroup();
    }
  }
  // ngOnInit(): void {
   
  // }
  public sendMessage(): void {
    if(this.group != null && this.group.groupId != 0 && this.user != null){
    const newMessage = { user: this.user, text: this.message };
    //this.messages.push(newMessage);
    this.groupChat.sendMessage(this.group.groupId.toString(),this.user.userName, this.message);
    this.message = '';
    }
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
