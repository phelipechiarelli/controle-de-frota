import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsFrotaComponent } from './forms-frota.component';

describe('FormsFrotaComponent', () => {
  let component: FormsFrotaComponent;
  let fixture: ComponentFixture<FormsFrotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsFrotaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormsFrotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
