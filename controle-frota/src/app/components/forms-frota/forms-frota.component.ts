import { Component, OnDestroy } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VeiculosService } from '../../services/veiculos.service';
import { Subscription } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forms-frota',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, InputTextModule, CommonModule, ToastModule],
  templateUrl: './forms-frota.component.html',
  styleUrl: './forms-frota.component.scss',
  providers: [MessageService]
})
export class FormsFrotaComponent implements OnDestroy {

  frotaForm: FormGroup;
  isEdit!: boolean;
  formBehavior: Subscription = new Subscription;
  countListaVeiculo: Subscription = new Subscription;
  veiculoId: number = 0;
  novoVeiculoId: any;


  constructor(private route: Router, private veiculosService: VeiculosService, private formBuilder: FormBuilder, private messageService: MessageService) {
    this.frotaForm = this.formBuilder.group({
      placa: ['', [Validators.required]],
      chassi: ['', [Validators.required]],
      renavam: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      ano: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.isEdit = false;

    this.formBehavior = this.veiculosService.hasId.subscribe(param => {
      this.isEdit = param > 0 ? true : false;
      if (param > 0) {
        this.veiculoId = param;
        this.veiculosService.getVeiculoPorId(param).subscribe({
          next: (data) => {
            this.frotaForm?.patchValue(
              {
                placa: data.placa,
                chassi: data.chassi,
                renavam: data.renavam,
                modelo: data.modelo,
                marca: data.marca,
                ano: data.ano
              }
            )
          }, error(err) {
            console.error(err)
          },
        });
      }
    });
  }

  get placa() {
    return this.frotaForm?.get('placa')!;
  }

  get chassi() {
    return this.frotaForm?.get('chassi')!;
  }

  get renavam() {
    return this.frotaForm?.get('renavam')!;
  }

  get modelo() {
    return this.frotaForm?.get('modelo')!;
  }

  get marca() {
    return this.frotaForm?.get('marca')!;
  }

  get ano() {
    return this.frotaForm?.get('ano')!;
  }

  submit() {
    this.frotaForm?.markAllAsTouched();
    if (this.frotaForm?.valid) {
      this.isEdit ? this.updateVeiculo(this.veiculoId, this.frotaForm?.value) : this.createVeiculo(this.frotaForm?.value);
    }
  }

  gerarNovoId() {
    const rawNum = Math.random();
    this.novoVeiculoId = Math.floor(rawNum * 1000000);
  }

  showCreateVeiculoToast() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Veículo criado com sucesso' });
  }

  showUpdateVeiculoToast() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Veículo atualizado com sucesso' });
  }

  createVeiculo(body: any) {
    this.gerarNovoId();
    const veiculoBody = {
      id: this.novoVeiculoId,
      ...body
    }
    this.veiculosService.createVeiculo(veiculoBody).subscribe({
      next: (value) => {

      },
      error: (err) => {
        console.error(err)
      },
    });
    this.showCreateVeiculoToast();
    this.back();
  }

  updateVeiculo(id: number, body: any) {
    const veiculoBody = {
      ...body,
      id: id
    }
    this.veiculosService.updateVeiculo(id, veiculoBody).subscribe({
      next: (value) => {

      },
      error: (err) => {
        console.error(err)
      },
    });

    this.showUpdateVeiculoToast();
    this.back();
  }

  back() {
    Object.keys(this.frotaForm.controls).forEach(controlName => {
      this.frotaForm?.get(controlName)?.disable();
    });
    setTimeout(() => {
      this.route.navigate(['/'])
    }, 2000);
  }

  ngOnDestroy(): void {
    this.formBehavior.unsubscribe();
  }

}
