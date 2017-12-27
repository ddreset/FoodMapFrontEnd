import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomStoreComponent } from './random-store.component';

describe('RandomStoreComponent', () => {
  let component: RandomStoreComponent;
  let fixture: ComponentFixture<RandomStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
