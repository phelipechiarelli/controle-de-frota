import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { VeiculosService } from '../../services/veiculos.service';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { VeiculoInterface } from '../../interfaces/VeiculoInterface';
import { SystemMessageService } from '../../services/system-message.service';
import { SystemMessageEnum } from '../../models/system-message.enum';
import { SystemMessageTypeEnum } from '../../models/system-message-type.enum';
import { SystemMessageSummaryEnum } from '../../models/system-message-summary.enum';

@Component({
  selector: 'app-lista-frota',
  standalone: true,
  imports: [TableModule, ButtonModule, HttpClientModule, ToastModule], 
  templateUrl: './lista-frota.component.html',
  styleUrl: './lista-frota.component.scss',
  providers: [MessageService, SystemMessageService]
})
export class ListaFrotaComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  listaDeVeiculos: VeiculoInterface[] = [];
  tabStyle = { 'min-width': '70rem' }

  constructor(private router: Router, private veiculosService: VeiculosService, private messageService: MessageService, private systemMessageService: SystemMessageService) {
    this.subscription = new Subscription;
  }

  ngOnInit(): void {
    this.getListaVeiculos();
  }

  sendIdParam(idParam: number) {
    this.veiculosService.changeCreateUpdateBehavior(idParam);
  }

  navigate(id?: number) {
    if (id) {
      this.sendIdParam(id);
      this.router.navigate([`/edit/${id}`])
    } else {
      this.sendIdParam(0);
      this.router.navigate([`/new`])
    }
  }

  getListaVeiculos() {
    this.subscription = this.veiculosService.getVeiculos().subscribe({
      next: veiculos => {
        this.listaDeVeiculos = veiculos
      },
      error: err => {
        this.systemMessageService.systemMessageService(SystemMessageTypeEnum.ERROR, SystemMessageSummaryEnum.ERROR, SystemMessageEnum.ERR_GET_LISTA_VEICULO); 
      }
    })
  }

  deleteVeiculos(id: number) {
    this.veiculosService.deleteVeiculo(id).subscribe({
      error: (error) => {
        this.systemMessageService.systemMessageService(SystemMessageTypeEnum.ERROR, SystemMessageSummaryEnum.ERROR, SystemMessageEnum.ERR_DELETE_VEICULO);
      }
    });
    this.getListaVeiculos();
    this.systemMessageService.systemMessageService(SystemMessageTypeEnum.SUCCESS, SystemMessageSummaryEnum.SUCCESS, SystemMessageEnum.DELETE_VEICULO);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
