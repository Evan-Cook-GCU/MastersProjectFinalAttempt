// src/app/shared/communication.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private eventSubject = new Subject<string>();

  event$ = this.eventSubject.asObservable();

  emitEvent(data: string) {
    this.eventSubject.next(data);
  }
}
