import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfowindowModalComponent } from './infowindow-modal.component';

describe('InfowindowModalComponent', () => {
  let component: InfowindowModalComponent;
  let fixture: ComponentFixture<InfowindowModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfowindowModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfowindowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
