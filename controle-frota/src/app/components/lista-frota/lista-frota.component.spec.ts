import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFrotaComponent } from './lista-frota.component';

describe('ListaFrotaComponent', () => {
  let component: ListaFrotaComponent;
  let fixture: ComponentFixture<ListaFrotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFrotaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaFrotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
