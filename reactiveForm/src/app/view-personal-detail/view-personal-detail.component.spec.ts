import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPersonalDetailComponent } from './view-personal-detail.component';

describe('ViewPersonalDetailComponent', () => {
  let component: ViewPersonalDetailComponent;
  let fixture: ComponentFixture<ViewPersonalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPersonalDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPersonalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
