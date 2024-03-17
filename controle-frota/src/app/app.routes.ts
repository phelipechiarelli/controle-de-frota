import { RouterModule, Routes } from '@angular/router';
import { FormsFrotaComponent } from './components/forms-frota/forms-frota.component';
import { NgModule } from '@angular/core';
import { ListaFrotaComponent } from './components/lista-frota/lista-frota.component';

export const routes: Routes = [
    {path: 'list', component: ListaFrotaComponent},
    {path: 'new', component: FormsFrotaComponent},
    {path: 'edit/:id', component: FormsFrotaComponent},
    {
        path: '',
        redirectTo: '/list',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }