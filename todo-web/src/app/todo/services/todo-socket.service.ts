import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TodoSocketService extends Socket {
  constructor() {
    super({url: 'http://localhost:3000', options: { origin: '*', transport : ['websocket'] }});
  }

  public dispatch(messageType: string, payload: any) {
    this.emit(messageType, payload);
  }

  public subscribeToMessage(messageType: string): Observable<any> {
    return this.fromEvent(messageType);
  }
}
