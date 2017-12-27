import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStoresComponent } from './dashboard-stores.component';

describe('DashboardStoresComponent', () => {
  let component: DashboardStoresComponent;
  let fixture: ComponentFixture<DashboardStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
