import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormContinerComponent } from './form-continer.component';

describe('FormContinerComponent', () => {
  let component: FormContinerComponent;
  let fixture: ComponentFixture<FormContinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormContinerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormContinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
