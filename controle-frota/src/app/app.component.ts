import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaFrotaComponent } from "./components/lista-frota/lista-frota.component";
import { HeaderComponent } from "./components/header/header.component";
import { VeiculosService } from './services/veiculos.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, ListaFrotaComponent, HeaderComponent],
    providers:[VeiculosService, HttpClient, HttpClientModule]
})
export class AppComponent {
  title = 'controle-frota';

}
