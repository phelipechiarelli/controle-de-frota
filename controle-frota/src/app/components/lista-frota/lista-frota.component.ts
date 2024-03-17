import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { VeiculosService } from '../../services/veiculos.service';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-lista-frota',
  standalone: true,
  imports: [TableModule, ButtonModule, HttpClientModule, ToastModule], 
  templateUrl: './lista-frota.component.html',
  styleUrl: './lista-frota.component.scss',
  providers: [MessageService]
})
export class ListaFrotaComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  listaDeVeiculos: any[] = [];
  tabStyle = { 'min-width': '70rem' }

  constructor(private router: Router, private veiculosService: VeiculosService, private messageService: MessageService) {
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
    this.subscription = this.veiculosService.getVeiculos().subscribe((veiculos) => {
      this.listaDeVeiculos = veiculos;
    })
  }

  showDeleteToast() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Veículo excluído com sucesso' });
  }

  deleteVeiculos(id: number) {
    this.veiculosService.deleteVeiculo(id).subscribe({
      next: (value) => {
      },
      error: (error) => {
        console.error('Erro ao excluir veículo:', error);
      }
    });
    this.getListaVeiculos();
    this.showDeleteToast(); 
    console.log('Veículo excluído com sucesso');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
