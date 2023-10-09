import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckIsActiveStatusComponent } from './check-is-active-status.component';

describe('CheckIsActiveStatusComponent', () => {
  let component: CheckIsActiveStatusComponent;
  let fixture: ComponentFixture<CheckIsActiveStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckIsActiveStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckIsActiveStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
