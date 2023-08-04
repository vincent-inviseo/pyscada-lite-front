import { Component, OnInit } from '@angular/core';
import { Message, ToastService } from 'src/app/design/services/toast.service';
import { toastAnimation } from 'src/app/design/animations/toasts';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  animations: toastAnimation,
})
export class ToastsComponent implements OnInit {
  public messages: Message[] = [];

  constructor(private readonly toasts: ToastService) {
  }

  public ngOnInit(): void {
    this.toasts.newMessage()
      .subscribe((messages) => {
        this.messages = messages;
      });
  }
}
