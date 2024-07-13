import { Injectable } from '@angular/core';
import 'signalr';
import * as $ from 'jquery';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private connection!: SignalR.Hub.Connection;
  private proxy!: SignalR.Hub.Proxy;
  private messageReceivedSource = new Subject<{ user: string, text: string }>();
  messageReceived$ = this.messageReceivedSource.asObservable();
  constructor() {
    this.initializeSignalR();
  }

  public initializeSignalR(): void {
    const win: any = window;
    /*if (!win.jQuery) {
      win.jQuery = $;
    }
    if (!win.$) {
      win.$ = $;
    }
    if (!win.SignalR) {
      win.SignalR = $.signalR;
    }*/
console.log($.hubConnection);
    this.connection = jQuery.hubConnection('http://localhost:44060');
    this.proxy = this.connection.createHubProxy('chatHub');

    this.proxy.on('broadcastMessage', (user: string, message: string) => {
      this.messageReceivedSource.next({ user, text: message });
      console.log(`${user}: ${message}`);
    });

    this.connection.start()
      .done(() => console.log('Now connected, connection ID=' + this.connection.id))
      .fail(() => console.log('Could not connect'));
  }

  public sendMessage(user: string, message: string): void {
    this.proxy.invoke('SendMessage', user, message)
      .fail((error: any) => console.error('Invocation failed. Error: ', error));
  }
}
