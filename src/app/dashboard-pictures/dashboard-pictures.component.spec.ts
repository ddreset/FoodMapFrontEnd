import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPicturesComponent } from './dashboard-pictures.component';

describe('DashboardPicturesComponent', () => {
  let component: DashboardPicturesComponent;
  let fixture: ComponentFixture<DashboardPicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPicturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
