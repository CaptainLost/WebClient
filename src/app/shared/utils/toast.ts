import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messageService: MessageService = inject(MessageService);

  showErrorToast(message: string): void;
  showErrorToast(title: string, message: string): void;
  showErrorToast(titleOrMessage: string, message?: string): void {
    const title = message !== undefined ? titleOrMessage : 'Error';
    const detail = message !== undefined ? message : titleOrMessage;

    this.messageService.add(
      {
        severity: 'error',
        summary: title,
        detail: detail,
        key: 'br'
      });
  }
}
