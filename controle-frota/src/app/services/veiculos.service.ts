import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { VeiculoInterface } from '../interfaces/VeiculoInterface';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

  private paramSource = new BehaviorSubject<number>(0);
  hasId = this.paramSource.asObservable();

  constructor(private http: HttpClient) { }

  changeCreateUpdateBehavior(param: number) {
    this.paramSource.next(param);
  }

  private handleError(error: any): Observable<never> {    
    return throwError(() => error);
  }

  getVeiculos(): Observable<VeiculoInterface[]> {
    return this.http.get<VeiculoInterface[]>('http://localhost:3000/veiculos').pipe(
      catchError(this.handleError));
  }

  getVeiculoPorId(id: number): Observable<VeiculoInterface> {
    return this.http.get<VeiculoInterface>(`http://localhost:3000/veiculos/${id}`).pipe(
      catchError(this.handleError));
  }

  createVeiculo(veiculoBody: VeiculoInterface): Observable<VeiculoInterface> {
    return this.http.post<VeiculoInterface>('http://localhost:3000/veiculos', veiculoBody).pipe(
      catchError(this.handleError));
  }

  updateVeiculo(id: number, veiculoBody: VeiculoInterface): Observable<VeiculoInterface> {
    return this.http.put<VeiculoInterface>(`http://localhost:3000/veiculos/${id}`, veiculoBody).pipe(
      catchError(this.handleError));
  }

  deleteVeiculo(id: number): Observable<VeiculoInterface> {
    return this.http.delete<VeiculoInterface>(`http://localhost:3000/veiculos/${id}`).pipe(
      catchError(this.handleError));
  }
}
