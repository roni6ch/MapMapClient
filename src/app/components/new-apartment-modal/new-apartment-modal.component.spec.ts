import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApartmentModalComponent } from './new-apartment-modal.component';

describe('NewApartmentModalComponent', () => {
  let component: NewApartmentModalComponent;
  let fixture: ComponentFixture<NewApartmentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewApartmentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewApartmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
