import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class SystemMessageService {

  constructor(private messageService: MessageService) { }

  systemMessageService (type: string, titulo: string, message: string){
    this.messageService.add({ severity: type, summary: titulo, detail: message});
  }
}
