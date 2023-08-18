import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Message {
  content: string;
  type: 'error' | 'warning' | 'success' | 'info';
  // eslint-disable-next-line @typescript-eslint/ban-types
  remove?: Function;
  callToAction?: {
    link: string[],
    label: string,
  };
}

interface SendOption {
  duration?: number;

}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messages = new BehaviorSubject<Message[]>([]);

  private _messages: Message[] = [];

  private defaultDuration = 10000;

  public removeAll(): void {
    this._messages = [];
    this.emitMessages();
  }

  public newMessage(): Observable<Message[]> {
    return this.messages.asObservable();
  }

  public send(message: Message, options: SendOption = {}): Message {
    this._messages.push(message);
    message.remove = (): void => {
      this.removeMessage(message);
    };

    if (options.duration !== 0) {
      setTimeout(() => {
        this.removeMessage(message);
      }, options.duration || this.defaultDuration);
    }

    this.emitMessages();

    return message;
  }

  public sendError(message: string, options: SendOption = {}): Message {
    return this.send({ content: message, type: 'error' }, options);
  }

  public sendInfo(message: string, options: SendOption = {}): Message {
    return this.send({ content: message, type: 'info' }, options);
  }

  public sendSuccess(message: string, options: SendOption = {}): Message {
    return this.send({ content: message, type: 'success' }, options);
  }

  public sendWarning(message: string, options: SendOption = {}): Message {
    return this.send({ content: message, type: 'warning' }, options);
  }

  private emitMessages(): void {
    this.messages.next(this._messages);
  }

  private removeMessage(message: Message): void {
    const index = this._messages.indexOf(message);
    if (index > -1) {
      this._messages.splice(index, 1);
      this.emitMessages();
    }
  }
}
