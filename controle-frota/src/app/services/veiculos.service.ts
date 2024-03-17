import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { VeiculoInterface } from '../interfaces/VeiculoInterface';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

  private paramSource = new BehaviorSubject<any>(null);
  hasId = this.paramSource.asObservable();

  constructor(private http: HttpClient) { }

  changeCreateUpdateBehavior(param: any) {
    this.paramSource.next(param);
  }

  getVeiculos(): Observable<VeiculoInterface[]> {
    return this.http.get<VeiculoInterface[]>('http://localhost:3000/veiculos');
  }

  getVeiculoPorId(id: number): Observable<VeiculoInterface> {
    return this.http.get<VeiculoInterface>(`http://localhost:3000/veiculos/${id}`);
  }

  createVeiculo(veiculoBody: VeiculoInterface): Observable<VeiculoInterface> {
    return this.http.post<VeiculoInterface>('http://localhost:3000/veiculos', veiculoBody);
  }

  updateVeiculo(id: number, veiculoBody: VeiculoInterface): Observable<VeiculoInterface> {
    return this.http.put<VeiculoInterface>(`http://localhost:3000/veiculos/${id}`, veiculoBody);
  }

  deleteVeiculo(id: number): Observable<VeiculoInterface> {
    return this.http.delete<VeiculoInterface>(`http://localhost:3000/veiculos/${id}`);
  }
}
