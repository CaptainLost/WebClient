import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messageService: MessageService = inject(MessageService);

    showErrorToast(title: string, message: string) {
        this.messageService.add({ severity: 'error', summary: title, detail: message });
    }
}
