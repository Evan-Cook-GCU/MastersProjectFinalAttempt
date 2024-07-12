import { Injectable } from '@angular/core';
import 'signalr';
import * as $ from 'jquery';
import { Observable, Subject } from 'rxjs';
import { Conversation, GroupChatMessage, Message } from '../Models/Models';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private connection!: SignalR.Hub.Connection;
  private proxy!: SignalR.Hub.Proxy;
  private messageReceivedSource = new Subject<Message>();
  messageReceived$ = this.messageReceivedSource.asObservable();
  constructor(private http: HttpClient) {
    this.initializeSignalR();
  }

  public initializeSignalR(): void {
    const win: any = window;
    
    console.log($.hubConnection);
    this.connection = jQuery.hubConnection('http://localhost:44060');
    this.proxy = this.connection.createHubProxy('chatHub');

    this.proxy.on('broadcastConversationMessage', (conversationId: number, user: string, message: string) => {
      const msg: Message = {
        conversationId,
        senderId: parseInt(user), // Assuming user is userId
        content: message,
        sentAt: new Date()
      };
      this.messageReceivedSource.next(msg);
    });

    this.connection.start()
      .done(() => console.log('Now connected, connection ID=' + this.connection.id))
      .fail(() => console.log('Could not connect'));
  }

  public sendMessage(conversationId:number, userId: number, message: string): void {
    this.proxy.invoke('SendConversationMessage', conversationId, userId, message)
      .fail((error: any) => console.error('Invocation failed. Error: ', error));
  }
  public getConversation(userId1: number, userId2: number): Observable<Conversation> {
    return this.http.get<Conversation>(`http://localhost:44060/api/conversations/${userId1}/${userId2}`);
  }
}
