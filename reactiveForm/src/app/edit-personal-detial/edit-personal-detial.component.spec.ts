import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonalDetialComponent } from './edit-personal-detial.component';

describe('EditPersonalDetialComponent', () => {
  let component: EditPersonalDetialComponent;
  let fixture: ComponentFixture<EditPersonalDetialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPersonalDetialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPersonalDetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
