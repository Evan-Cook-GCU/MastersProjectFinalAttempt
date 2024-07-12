import { Injectable } from '@angular/core';
import 'signalr';
import * as $ from 'jquery';
import { Observable, Subject } from 'rxjs';
import { GroupChatMessage } from '../Models/Models';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GroupChatService {
  private connection!: SignalR.Hub.Connection;
  private proxy!: SignalR.Hub.Proxy;
  private messageReceivedSource = new Subject<{ user: string, text: string }>();
  messageReceived$ = this.messageReceivedSource.asObservable();
  constructor(private http: HttpClient) {
    this.initializeSignalR();
  }

  public initializeSignalR(): void {
    const win: any = window;
    
    console.log($.hubConnection);
    this.connection = jQuery.hubConnection('http://localhost:44060');
    this.proxy = this.connection.createHubProxy('chatHub');

    this.proxy.on('broadcastGrpupMessage', (groupId:string,user: string, message: string) => {
      this.messageReceivedSource.next({ user, text: message });
      console.log(`${user}: ${message}`);
    });

    this.connection.start()
      .done(() => console.log('Now connected, connection ID=' + this.connection.id))
      .fail(() => console.log('Could not connect'));
  }

  public sendMessage(groupId:string, user: string, message: string): void {
    this.proxy.invoke('SendGroupMessage', groupId, user, message)
      .fail((error: any) => console.error('Invocation failed. Error: ', error));
  }
  public getChatHistory(groupId: number): Observable<GroupChatMessage[]> {
    return this.http.get<GroupChatMessage[]>(`http://localhost:44060/api/groupchat/${groupId}/history`);
  }
}
