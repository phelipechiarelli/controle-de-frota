import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToastModule,ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [MessageService]
})
export class HeaderComponent {

  constructor(private messageService: MessageService) { }

  visible: boolean = false;

  summary: string = `Projeto criado por Phelipe Chiarelli`;
  message: string = `Tecnologias: Angular v17.3.0, PrimeNG v17.11.0, \nNode.js v20.11.1`
  

  showConfirm() {
    if (!this.visible) {
      this.messageService.add({ key: 'confirm', sticky: true, severity: 'custom', summary: this.summary, detail: this.message});
      this.visible = true;
    }
  }

  onClose() {
    this.visible = false;
  }
}
