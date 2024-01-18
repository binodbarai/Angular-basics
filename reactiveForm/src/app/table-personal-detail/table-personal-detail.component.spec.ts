import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePersonalDetailComponent } from './table-personal-detail.component';

describe('TablePersonalDetailComponent', () => {
  let component: TablePersonalDetailComponent;
  let fixture: ComponentFixture<TablePersonalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablePersonalDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablePersonalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
